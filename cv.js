document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.dataset.level;
        bar.style.setProperty('--skill-level', `${level}%`);
    });

    // Modal functionality
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    const closeBtns = document.querySelectorAll('.close-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.nextElementSibling;
            modal.style.display = 'block';
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}); 
