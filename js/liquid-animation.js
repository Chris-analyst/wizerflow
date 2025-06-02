// Import Three.js from CDN if not already included in HTML
document.addEventListener('DOMContentLoaded', function() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = initLiquidAnimation;
        document.head.appendChild(script);
    } else {
        initLiquidAnimation();
    }
});

function initLiquidAnimation() {
    const canvas = document.getElementById('liquid-animation');
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    
    // Set renderer size to match canvas
    const setSize = () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        renderer.setSize(width, height, false);
    };
    setSize();
    
    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 2;
    
    // Create shader material for liquid effect
    const liquidShader = {
        uniforms: {
            time: { value: 0 },
            resolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
            color1: { value: new THREE.Color('#ECF0F1') },
            color2: { value: new THREE.Color('#3498DB') },
            color3: { value: new THREE.Color('#2ABC9B') },
            color4: { value: new THREE.Color('#34495E') }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec2 resolution;
            uniform vec3 color1;
            uniform vec3 color2;
            uniform vec3 color3;
            uniform vec3 color4;
            varying vec2 vUv;
            
            // Simplex noise function
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
            
            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy));
                vec2 x0 = v - i + dot(i, C.xx);
                vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
                vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
                m = m*m;
                m = m*m;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
                vec3 g;
                g.x = a0.x * x0.x + h.x * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }
            
            void main() {
                vec2 uv = vUv;
                
                // Create flowing liquid effect with multiple noise layers
                float n1 = snoise(vec2(uv.x * 3.0 + time * 0.1, uv.y * 3.0 - time * 0.1)) * 0.5 + 0.5;
                float n2 = snoise(vec2(uv.x * 5.0 - time * 0.15, uv.y * 5.0 + time * 0.1)) * 0.5 + 0.5;
                float n3 = snoise(vec2(uv.x * 8.0 + time * 0.2, uv.y * 8.0 - time * 0.15)) * 0.5 + 0.5;
                
                // Combine noise layers
                float finalNoise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
                
                // Create color gradient based on noise
                vec3 color;
                if (finalNoise < 0.3) {
                    color = mix(color1, color2, finalNoise / 0.3);
                } else if (finalNoise < 0.6) {
                    color = mix(color2, color3, (finalNoise - 0.3) / 0.3);
                } else {
                    color = mix(color3, color4, (finalNoise - 0.6) / 0.4);
                }
                
                // Add vignette effect
                float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5) * 2.0);
                color *= vignette * 0.8 + 0.2;
                
                // Add subtle pulsing
                float pulse = sin(time * 0.5) * 0.05 + 0.95;
                color *= pulse;
                
                gl_FragColor = vec4(color, 0.7); // More transparent for lighter effect
            }
        `
    };
    
    // Create a plane geometry that fills the screen
    const geometry = new THREE.PlaneGeometry(4, 4);
    const material = new THREE.ShaderMaterial(liquidShader);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        
        // Update time uniform for shader
        material.uniforms.time.value = clock.getElapsedTime();
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setSize();
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        material.uniforms.resolution.value.set(canvas.clientWidth, canvas.clientHeight);
    });
    
    // Start animation
    animate();
}
