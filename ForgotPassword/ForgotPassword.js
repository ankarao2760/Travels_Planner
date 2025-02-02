document.addEventListener('DOMContentLoaded', function () {

    const emailField = document.getElementById('email');
    const resetBtn = document.querySelector('.reset-btn');
    const successMessage = document.getElementById('success-message');
    const form = document.getElementById('forgotPasswordForm');
    const errorMessageElement = document.getElementById('error-message');
    
    // Create error message element for email
    const errorMessage = document.createElement('span');
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '12px';

    // Email validation on entering '@'
    function validateEmail() {
        const emailWrapper = emailField.closest('.form-group');
        const emailValue = emailField.value;
        
        // Simple check to ensure '@' is present in the email
        if (emailValue.indexOf('@') === -1) {
            if (!emailWrapper.contains(errorMessage)) {
                errorMessage.textContent = "Please enter a valid email address.";
                emailWrapper.appendChild(errorMessage);
            }
            return false;
        } else {
            if (emailWrapper.contains(errorMessage)) {
                emailWrapper.removeChild(errorMessage);
            }
            return true;
        }
    }

    // Event Listener for email field validation
    emailField.addEventListener('input', validateEmail);

    // Form Submit validation
    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form submission for demo purposes
        
        // If the email is valid, show the success message
        if (validateEmail()) {
            // Hide the form and display the success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
        }
    });

});
