// $(".input_text").focus(function () {
//     $(this).prev('.fa').addclass('glowIcon')
// })
// $(".input_text").focusout(function () {
//     $(this).prev('.fa').removeclass('glowIcon')
// })




document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error_message');

    submitButton.addEventListener('click', async function () {
        const username = usernameInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch('/loginAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Login successful
                window.location.href = '/bus_reservation_frontend/home.html'; // Redirect to another page
            } else {
                // Handle login error
                const data = await response.json();
                errorMessage.textContent = data.message;
            }
        } catch (error) {
            console.error('Login error:', error);
            errorMessage.textContent = 'An error occurred during login.';
        }
    });
});
