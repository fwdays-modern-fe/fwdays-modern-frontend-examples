// Handle avatar edit button
document.querySelector('.edit-avatar').addEventListener('click', () => {
    // Implement avatar upload functionality
    alert('Avatar upload functionality would go here');
});

// Handle form submission
document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Implement form submission
    alert('Profile update functionality would go here');
});

// Handle password change
document.querySelector('.button.is-info').addEventListener('click', () => {
    // Implement password change
    alert('Password change functionality would go here');
});

// Handle mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');

    navbarBurger.addEventListener('click', () => {
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
    });
});
