document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) {
        console.error('Canvas element for confetti not found!');
        return;
    }
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const numberOfPieces = 150; // Cantidad de confeti
    // Paleta de colores más "masculina"
    const colors = [
        '#2c3e50', // Azul oscuro
        '#3498db', // Azul brillante
        '#2ecc71', // Verde esmeralda
        '#1abc9c', // Turquesa
        '#f1c40f', // Amarillo (como acento)
        '#e67e22', // Naranja zanahoria (como acento)
        '#95a5a6', // Gris claro
        '#7f8c8d'  // Gris medio
    ];

    let animationFrameId; // Variable para guardar el ID de la animación
    const confettiDuration = 5000; // 5 segundos en milisegundos

    function ConfettiParticle(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 6 + 3; // Tamaño del confeti
        this.vx = Math.random() * 4 - 2;    // Velocidad horizontal
        this.vy = Math.random() * 3 + 2;    // Velocidad vertical (caída)
        this.opacity = 1;
        this.angle = Math.random() * Math.PI * 2; // Ángulo inicial para rotación (opcional)
        this.angularSpeed = Math.random() * 0.02 - 0.01; // Velocidad de rotación (opcional)
    }

    ConfettiParticle.prototype.draw = function() {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x + this.radius / 2, this.y + this.radius / 2); // Mover origen para rotar alrededor del centro
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        // Dibujar un rectángulo simple para el confeti
        ctx.fillRect(-this.radius / 2, -this.radius / 2, this.radius, this.radius * 1.5); 
        ctx.fill();
        ctx.restore();
    };

    ConfettiParticle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.angularSpeed;
        this.opacity -= 0.005; // Desvanecer lentamente

        // Si el confeti sale de la pantalla por abajo o se desvanece, reiniciarlo arriba
        // Esta lógica se aplicará durante los 5 segundos que dura el efecto.
        if (this.y > canvas.height + this.radius * 2 || this.opacity <= 0) {
            this.x = Math.random() * canvas.width;
            this.y = -this.radius * 2 - Math.random() * 50; // Empezar justo fuera de la pantalla arriba
            this.vx = Math.random() * 4 - 2;
            this.vy = Math.random() * 3 + 2;
            this.opacity = 1;
            this.angle = Math.random() * Math.PI * 2;
        }
    };

    function initConfetti() {
        for (let i = 0; i < numberOfPieces; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height - canvas.height; // Empezar arriba, algunos ya visibles
            const color = colors[Math.floor(Math.random() * colors.length)];
            confettiPieces.push(new ConfettiParticle(x, y, color));
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach(particle => {
            particle.update();
            particle.draw();
        });
        animationFrameId = requestAnimationFrame(animateConfetti);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // No es necesario reiniciar el confeti aquí, ya que la duración es fija.
    });

    initConfetti();
    animateConfetti(); // Inicia la animación

    // Detener el confeti después de la duración especificada
    setTimeout(() => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        // Opcionalmente, podrías vaciar el array si es necesario para alguna lógica futura, 
        // pero al detener la animación y limpiar el canvas, el efecto visual cesa.
        // confettiPieces.length = 0;
        console.log("Efecto de confeti detenido después de " + confettiDuration / 1000 + " segundos.");
    }, confettiDuration);
}); 