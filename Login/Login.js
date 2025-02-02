document.addEventListener('DOMContentLoaded', function () {

    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    togglePassword.addEventListener('click', function () {
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;
        togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // Refresh captcha functionality
    const refreshCaptchaButton = document.getElementById('refreshCaptcha');
    const captchaDisplay = document.getElementById('captcha-display');
    const captchaInput = document.getElementById('captcha');
    const captchaError = document.getElementById('captcha-error');

    function generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        captchaDisplay.textContent = captcha;
    }

    generateCaptcha(); // Initialize captcha on page load

    refreshCaptchaButton.addEventListener('click', function () {
        generateCaptcha();
        captchaInput.value = '';
        captchaError.textContent = ''; // Clear any previous errors
    });

    // Form validation and login functionality
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form submission for validation

        // Clear previous error messages
        document.getElementById('username-error').textContent = '';
        document.getElementById('password-error').textContent = '';
        captchaError.textContent = '';

        let isValid = true;

        // Validate Username
        const username = document.getElementById('username').value;
        if (username === '') {
            document.getElementById('username-error').textContent = 'Username is required';
            isValid = false;
        }

        // Validate Password
        const password = passwordField.value;
        if (password === '') {
            document.getElementById('password-error').textContent = 'Password is required';
            isValid = false;
        }

        // Validate Captcha
        const captchaValue = captchaInput.value;
        if (captchaValue !== captchaDisplay.textContent) {
            captchaError.textContent = 'Captcha does not match';
            isValid = false;
        }

        // If all validations pass, proceed to login check
        if (isValid) {
            // Collect login data
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(
                (user) =>
                    (user.email === username || user.mobile === username) && user.password === password
            );

            if (user) {
                alert("Login successful!");
                window.location.href = './Travel/Travel.html';  // Redirect to Travel page
            } else {
                alert("Invalid username or password. Please try again.");
            }
        }
    });

});
