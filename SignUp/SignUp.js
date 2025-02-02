document.addEventListener('DOMContentLoaded', function () {
    // Get the form and input elements
    const signupForm = document.getElementById('signupForm');
    const firstNameField = document.getElementById('first-name');
    const lastNameField = document.getElementById('last-name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const captchaInput = document.getElementById('captcha');
    const captchaDisplay = document.getElementById('captcha-display');
    const refreshCaptchaButton = document.getElementById('refreshCaptcha');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

    const confirmPasswordError = document.getElementById('confirm-password-error');
    const captchaError = document.getElementById('captcha-error');
    const firstNameError = document.getElementById('first-name-error');
    const lastNameError = document.getElementById('last-name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('mobile-error');
    const passwordError = document.getElementById('password-error');

    // Check if the elements exist before proceeding
    if (confirmPasswordField && passwordField && confirmPasswordError) {
        confirmPasswordField.addEventListener('input', function () {
            if (confirmPasswordField.value !== passwordField.value) {
                confirmPasswordError.textContent = 'Passwords do not match';
            } else {
                confirmPasswordError.textContent = '';
            }
        });
    }

    if (captchaInput && captchaDisplay && captchaError) {
        captchaInput.addEventListener('input', function () {
            if (captchaInput.value !== captchaDisplay.textContent) {
                captchaError.textContent = 'Captcha does not match';
            } else {
                captchaError.textContent = '';
            }
        });
    }

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const type = passwordField.type === 'password' ? 'text' : 'password';
            passwordField.type = type;
            togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function () {
            const type = confirmPasswordField.type === 'password' ? 'text' : 'password';
            confirmPasswordField.type = type;
            toggleConfirmPassword.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // Function to generate a new captcha
    function generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        if (captchaDisplay) {
            captchaDisplay.textContent = captcha;
        }
    }

    generateCaptcha(); // Initialize captcha on page load

    if (refreshCaptchaButton) {
        refreshCaptchaButton.addEventListener('click', function () {
            generateCaptcha();
            captchaInput.value = ''; // Clear captcha input field
            if (captchaError) {
                captchaError.textContent = ''; // Clear any previous error
            }
        });
    }

    // Function to validate individual fields and display error messages
    function validateField(input, errorElement, validationFn, errorMessage) {
        if (!validationFn(input.value)) {
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
            return false;
        } else {
            if (errorElement) {
                errorElement.textContent = ''; // Clear error if valid
            }
            return true;
        }
    }

    // Event listeners for real-time validation on input fields
    if (firstNameField && firstNameError) {
        firstNameField.addEventListener('input', function () {
            validateField(firstNameField, firstNameError, 
                          (value) => value.trim() !== '' && !value.includes(' '), 
                          'First name does not allow spaces');
        });
    }

    if (lastNameField && lastNameError) {
        lastNameField.addEventListener('input', function () {
            validateField(lastNameField, lastNameError, 
                          (value) => value.trim() !== '' && !value.includes(' '), 
                          'Last name does not allow spaces');
        });
    }

    if (emailField && emailError) {
        emailField.addEventListener('input', function () {
            validateField(emailField, emailError, 
                          (value) => value.includes('@'), 
                          'Please enter a valid email address');
        });
    }

    if (phoneField && phoneError) {
        phoneField.addEventListener('input', function () {
            validateField(phoneField, phoneError, 
                          (value) => /^[0-9]{10}$/.test(value), 
                          'Please enter a valid phone number (10 digits)');
        });
    }

    if (passwordField && passwordError) {
        passwordField.addEventListener('input', function () {
            validateField(passwordField, passwordError, 
                          (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value), 
                          'Password must include 8 chars, including upper, lower, digit, and special char');
        });
    }

    // Form validation before submitting
    function validateForm() {
        let isValid = true;

        // Validate each field and check if there's any error
        if (!validateField(firstNameField, firstNameError, 
                           (value) => value.trim() !== '' && !value.includes(' '), 
                           'First name does not allow spaces')) {
            isValid = false;
        }
        if (!validateField(lastNameField, lastNameError, 
                           (value) => value.trim() !== '' && !value.includes(' '), 
                           'Last name does not allow spaces')) {
            isValid = false;
        }
        if (!validateField(emailField, emailError, 
                           (value) => value.includes('@'), 
                           'Please enter a valid email address')) {
            isValid = false;
        }
        if (!validateField(phoneField, phoneError, 
                           (value) => /^[0-9]{10}$/.test(value), 
                           'Please enter a valid phone number (10 digits)')) {
            isValid = false;
        }
        if (!validateField(passwordField, passwordError, 
                           (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value), 
                           'Password must include 8 chars, including upper, lower, digit, and special char')) {
            isValid = false;
        }
        if (confirmPasswordField.value !== passwordField.value) {
            if (confirmPasswordError) {
                confirmPasswordError.textContent = 'Passwords do not match';
            }
            isValid = false;
        } else {
            if (confirmPasswordError) {
                confirmPasswordError.textContent = '';
            }
        }
        if (captchaInput.value !== captchaDisplay.textContent) {
            if (captchaError) {
                captchaError.textContent = 'Captcha does not match';
            }
            isValid = false;
        } else {
            if (captchaError) {
                captchaError.textContent = '';
            }
        }

        return isValid;
    }

    // Submit form and store data in localStorage
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission for validation

            // Validate form fields before submitting
            if (validateForm()) {
                // Store user data in local storage
                const userData = {
                    firstName: firstNameField.value.trim(),
                    lastName: lastNameField.value.trim(),
                    email: emailField.value.trim(),
                    mobile: phoneField.value.trim(),
                    password: passwordField.value.trim(),
                    dob: document.getElementById('dob').value,
                    gender: document.getElementById('gender').value,
                };

                const users = JSON.parse(localStorage.getItem("users")) || [];
                users.push(userData);
                localStorage.setItem("users", JSON.stringify(users));

                alert("Sign Up Successful!");
                window.location.href = '../index.html'; // Redirect to login page
            } else {
                console.log("Form validation failed. Check errors above.");
            }
        });
    }
});
