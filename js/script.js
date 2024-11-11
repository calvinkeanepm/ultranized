document.addEventListener('DOMContentLoaded', function() {
    // Lees meer knoppen
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.nextElementSibling;
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

    // Sluit knoppen
    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Sluit bij klik buiten modal
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Voer eventuele animaties uit
            
            // Navigeer na een korte vertraging
            setTimeout(() => {
                window.location.href = href;
            }, 100); // Korte vertraging voor soepele overgang
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Sluit menu bij klik op link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // Sluit menu bij klik buiten menu
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        }
    });

    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--skill-level', level);
    });
});

// Smooth scrolling voor interne links
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Secties laten verschijnen bij scrollen
const sections = document.querySelectorAll('section');

const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
    });
}, options);

sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

// Verbeterde Formuliervalidatie
const form = document.querySelector('form');
const naamInput = document.getElementById('naam');
const emailInput = document.getElementById('email');
const berichtInput = document.getElementById('bericht');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    if (naamInput.value.trim() === '') {
        valid = false;
        naamInput.style.borderColor = 'red';
    } else {
        naamInput.style.borderColor = '';
    }

    if (emailInput.value.trim() === '') {
        valid = false;
        emailInput.style.borderColor = 'red';
    } else {
        emailInput.style.borderColor = '';
    }

    if (berichtInput.value.trim() === '') {
        valid = false;
        berichtInput.style.borderColor = 'red';
    } else {
        berichtInput.style.borderColor = '';
    }

    if (valid) {
        alert('Bedankt voor je bericht, ' + naamInput.value + '!');
        form.reset();
    } else {
        alert('Vul alstublieft alle vereiste velden in.');
    }
});

// Hamburgermenu functionaliteit
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('change', function() {
    if(this.checked) {
        navMenu.classList.add('active');
    } else {
        navMenu.classList.remove('active');
    }
});

// Sluit menu wanneer een link wordt aangeklikt
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.checked = false;
        navMenu.classList.remove('active');
    });
});

// Initialiseer AOS
AOS.init({
    duration: 1000,
});

// Back to Top Button
const backToTopButton = document.querySelector("#back-to-top");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (window.pageYOffset > 300) { // Show backToTopButton
        if(!backToTopButton.classList.contains("show")) {
            backToTopButton.classList.add("show");
        }
    } else { // Hide backToTopButton
        if(backToTopButton.classList.contains("show")) {
            backToTopButton.classList.remove("show");
        }
    }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

function smoothScrollBackToTop(e) {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: "smooth"});
}

// Filter functionaliteit
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.project').forEach(project => {
            if (filter === 'all' || project.classList.contains(filter)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

// Animaties met AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true
});

// Modal functies
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Sluit modal als er buiten de modal wordt geklikt
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

