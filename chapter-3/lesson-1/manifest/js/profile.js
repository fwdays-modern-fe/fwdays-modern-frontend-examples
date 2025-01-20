// Зміна аватару
document.querySelector('.edit-avatar').addEventListener('click', () => {
    // Implement avatar upload functionality
    alert('Avatar upload functionality would go here');
});

// Відправка форми
document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Profile update functionality would go here');
});

// Зміна паролю
document.querySelector('.button.is-info').addEventListener('click', () => {
    alert('Password change functionality would go here');
});

// Навіція на мобільних девайсах через бургер меню
document.addEventListener('DOMContentLoaded', () => {
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');

    navbarBurger.addEventListener('click', () => {
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
    });
});
