/* ================================
   WizerFlow - Enhanced Particle Network
   ================================ */

document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');

    var brandColors = {
        blue: { r: 74, g: 158, b: 255 },
        purple: { r: 108, g: 99, b: 255 },
        violet: { r: 139, g: 92, b: 246 },
        deepPurple: { r: 80, g: 36, b: 180 }
    };

    var config = {
        particleCount: 120,
        particleRadius: 2.5,
        lineMaxDistance: 160,
        mouseRadius: 200,
        speed: 0.25,
        glowSize: 8
    };

    var particles = [];
    var mouse = { x: null, y: null, radius: config.mouseRadius };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function getRandomBrandColor(alpha) {
        var colors = [brandColors.blue, brandColors.purple, brandColors.violet, brandColors.deepPurple];
        var color = colors[Math.floor(Math.random() * colors.length)];
        return { r: color.r, g: color.g, b: color.b, a: alpha || 0.5 };
    }

    function getGradientColor(x, y, alpha) {
        var t = (x + y) / (canvas.width + canvas.height);
        var colorA = brandColors.blue;
        var colorB = brandColors.deepPurple;
        return {
            r: Math.round(colorA.r + (colorB.r - colorA.r) * t),
            g: Math.round(colorA.g + (colorB.g - colorA.g) * t),
            b: Math.round(colorA.b + (colorB.b - colorA.b) * t),
            a: alpha || 0.12
        };
    }

    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.speed;
        this.vy = (Math.random() - 0.5) * config.speed;
        this.radius = config.particleRadius;
        this.baseRadius = config.particleRadius;
        this.color = getRandomBrandColor(0.85);
        this.glowAlpha = 0.3;
        this.targetGlow = 0.3;
    }

    Particle.prototype.draw = function () {
        // Subtle glow
        if (this.glowAlpha > 0.01) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + config.glowSize, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + this.color.r + ', ' + this.color.g + ', ' + this.color.b + ', ' + (this.glowAlpha * 0.15) + ')';
            ctx.fill();
        }

        // Core particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + this.color.r + ', ' + this.color.g + ', ' + this.color.b + ', ' + this.color.a + ')';
        ctx.fill();
    };

    Particle.prototype.update = function () {
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.x += this.vx;
        this.y += this.vy;

        this.targetGlow = 0.3;

        if (mouse.x !== null && mouse.y !== null) {
            var dx = mouse.x - this.x;
            var dy = mouse.y - this.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                var force = (mouse.radius - distance) / mouse.radius;
                var angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * 1.5;
                this.y -= Math.sin(angle) * force * 1.5;
                this.radius = this.baseRadius + force * 2;
                this.color.a = 0.85 + force * 0.15;
                this.targetGlow = 0.3 + force * 0.7;
            } else {
                this.radius += (this.baseRadius - this.radius) * 0.05;
                this.color.a += (0.85 - this.color.a) * 0.05;
            }
        } else {
            this.radius += (this.baseRadius - this.radius) * 0.05;
            this.color.a += (0.85 - this.color.a) * 0.05;
        }

        this.glowAlpha += (this.targetGlow - this.glowAlpha) * 0.08;

        this.draw();
    };

    function drawLines() {
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.lineMaxDistance) {
                    var opacity = (1 - (distance / config.lineMaxDistance)) * 0.3;
                    var avgX = (particles[i].x + particles[j].x) / 2;
                    var avgY = (particles[i].y + particles[j].y) / 2;
                    var color = getGradientColor(avgX, avgY, opacity);

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')';
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Mouse connection lines
        if (mouse.x !== null && mouse.y !== null) {
            for (var i = 0; i < particles.length; i++) {
                var dx = mouse.x - particles[i].x;
                var dy = mouse.y - particles[i].y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    var opacity = (1 - (distance / mouse.radius)) * 0.4;
                    var t = i / particles.length;
                    var colorA = brandColors.blue;
                    var colorB = brandColors.violet;
                    var r = Math.round(colorA.r + (colorB.r - colorA.r) * t);
                    var g = Math.round(colorA.g + (colorB.g - colorA.g) * t);
                    var b = Math.round(colorA.b + (colorB.b - colorA.b) * t);

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function initParticles() {
        particles = [];
        for (var i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLines();
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', function () {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', function () {
        resizeCanvas();
        initParticles();
    });

    resizeCanvas();
    initParticles();
    animate();
});
