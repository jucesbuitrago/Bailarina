document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitButton');
    const errorMessage = document.getElementById('errorMessage');

    // Clave estática
    const correctPassword = "Jor2025";

    if (submitButton) { // Asegurarse de que el botón exista (solo en index.html)
        submitButton.addEventListener('click', function() {
            const enteredPassword = passwordInput.value;
            if (enteredPassword === correctPassword) {
                // Redirigir a la página del video
                window.location.href = 'video.html';
            } else {
                // Mostrar mensaje de error
                errorMessage.textContent = 'Clave incorrecta. Inténtalo de nuevo.';
                passwordInput.focus();
                passwordInput.value = ''; // Limpiar el campo
            }
        });
    }

    // Opcional: Permitir enviar con la tecla Enter en el campo de contraseña
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Evitar el comportamiento por defecto del Enter (si lo hubiera en un form)
                submitButton.click(); // Simular clic en el botón de acceso
            }
        });
    }
}); 