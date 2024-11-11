document.addEventListener('DOMContentLoaded', function() {
    // Basis Swiper configuratie voor project cards
    const projectCardConfig = {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        simulateTouch: true,
        centeredSlides: true,
        slideToClickedSlide: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    };

    // Filter functionaliteit
    const filterTags = document.querySelectorAll('.filter-tag');
    const yearSelect = document.querySelector('.year-select');
    const projectCards = document.querySelectorAll('.project-card');
    let activeFilters = new Set();
    let selectedYear = '';

    // Event listener voor de filter-knoppen
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagValue = this.getAttribute('data-tag').toLowerCase();
            this.classList.toggle('active');
            
            if (activeFilters.has(tagValue)) {
                activeFilters.delete(tagValue);
            } else {
                activeFilters.add(tagValue);
            }
            
            updateProjectVisibility();
        });
    });

    // Event listener voor de jaar-selectie
    yearSelect.addEventListener('change', function() {
        selectedYear = this.value;
        updateProjectVisibility();
    });

    // Functie om de zichtbaarheid van projecten bij te werken
    function updateProjectVisibility() {
        projectCards.forEach(card => {
            const cardTags = card.getAttribute('data-tags').toLowerCase().split(',');
            const hasActiveTag = Array.from(activeFilters).some(filter => 
                cardTags.includes(filter.toLowerCase())
            );
            const matchesYear = selectedYear ? cardTags.includes(selectedYear.toLowerCase()) : true;
            card.style.display = (hasActiveTag || activeFilters.size === 0) && matchesYear ? 'block' : 'none';
        });
    }

    // Voor elke project card een aparte Swiper instantie maken met mouseup handler
    document.querySelectorAll('.project-card').forEach((card, index) => {
        const swiper = new Swiper(card.querySelector('.swiper-container'), projectCardConfig);

        // Voeg mouseup handler toe
        card.addEventListener('mouseup', () => {
            swiper.slideTo(swiper.activeIndex); // Reset naar de dichtsbijzijnde slide
        });

        // Lightbox openen bij klik op slide
        const slides = card.querySelectorAll('.swiper-slide');
        slides.forEach((slide, slideIndex) => {
            slide.addEventListener('click', () => {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                // Gebruik de actieve index van de originele swiper
                const activeIndex = swiper.activeIndex;
                
                lightbox.innerHTML = `
                    <div class="lightbox-swiper">
                        <div class="swiper-wrapper">
                            ${Array.from(slides).map((slide, index) => {
                                // Bereken de werkelijke index op basis van de actieve slide
                                const realIndex = (index + activeIndex) % slides.length;
                                const currentSlide = slides[realIndex];
                                const currentImg = currentSlide.querySelector('img');
                                const currentVideo = currentSlide.querySelector('video');
                                
                                if (currentImg) {
                                    return `
                                        <div class="swiper-slide">
                                            <div class="swiper-zoom-container">
                                                <img src="${currentImg.src}" alt="${currentImg.alt}">
                                            </div>
                                        </div>
                                    `;
                                } else if (currentVideo) {
                                    return `
                                        <div class="swiper-slide">
                                            <div class="swiper-zoom-container">
                                                <video controls style="width: 100%; height: 100%;">
                                                    <source src="${currentVideo.querySelector('source').src}" type="video/mp4">
                                                </video>
                                            </div>
                                        </div>
                                    `;
                                }
                            }).join('')}
                        </div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                        <div class="lightbox-close">&times;</div>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';

                // Lightbox Swiper initialiseren met de juiste startindex
                const lightboxSwiper = new Swiper(lightbox.querySelector('.lightbox-swiper'), {
                    initialSlide: 0, // We hebben de volgorde al aangepast, dus start bij 0
                    slidesPerView: 1,
                    spaceBetween: 30,
                    simulateTouch: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    zoom: {
                        maxRatio: 3,
                        toggle: true,
                    },
                    keyboard: {
                        enabled: true,
                    }
                });

                // Lightbox sluiten
                lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                });

                // Lightbox sluiten met Escape toets
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        lightbox.remove();
                        document.body.style.overflow = '';
                    }
                });
            });
        });
    });
});
