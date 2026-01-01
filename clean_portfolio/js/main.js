// Simple Portfolio JS
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded!');
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
