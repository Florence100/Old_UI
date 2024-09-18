(function () {
    const nameField = document.querySelector('[rel="user-name__value"]');
    const emailField = document.querySelector('[rel="user-email__value"]');

    nameField.textContent = localStorage.getItem('userName');
    emailField.textContent = localStorage.getItem('userEmail');
})()