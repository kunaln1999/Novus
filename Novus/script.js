const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// --- Magnet Effect ---
function initMagnetEffect(container = document) {
    const magnets = container.querySelectorAll('.magnet-target, .btn, .cta-button, .contact-option');

    magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Adjust strength of magnet effect
            const strength = 25;
            const moveX = (x / rect.width) * strength;
            const moveY = (y / rect.height) * strength;

            magnet.style.transform = `translate(${moveX}px, ${moveY}px)`;

            // Move inner text slightly less for depth
            const text = magnet.querySelector('.btn-text, .option-text');
            if (text) {
                text.style.transform = `translate(${moveX * 0.4}px, ${moveY * 0.4}px)`;
            }
        });

        magnet.addEventListener('mouseleave', () => {
            magnet.style.transform = 'translate(0, 0)';
            const text = magnet.querySelector('.btn-text, .option-text');
            if (text) {
                text.style.transform = 'translate(0, 0)';
            }
        });
    });
}

async function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    try {
        const response = await fetch('components/footer.html');
        const html = await response.text();
        placeholder.innerHTML = html;

        // Re-run observer for the new content
        placeholder.querySelectorAll('.reveal-on-scroll, .reveal-text').forEach(el => observer.observe(el));

        // Update year
        const yearSpan = document.getElementById('copyright-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    } catch (err) {
        console.error('Failed to load footer:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Hero Animations ---
    const heroTitles = document.querySelectorAll('.line-inner');

    // Trigger animations immediately
    setTimeout(() => {
        document.body.classList.add('loaded');
        heroTitles.forEach((title, index) => {
            setTimeout(() => {
                title.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);



    // --- 3. Scroll Reveal ---
    document.querySelectorAll('.reveal-on-scroll, .reveal-text').forEach(el => observer.observe(el));

    // --- 4. Parallax Effect for Images ---
    const parallaxImages = document.querySelectorAll('.parallax-bg');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        parallaxImages.forEach(img => {
            const parent = img.parentElement;
            if (!parent) return;
            const parentTop = parent.getBoundingClientRect().top + scrollY;
            const parentHeight = parent.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Calculate relative scroll position
            // When element is in middle of screen, offset is 0
            if (parentTop < scrollY + viewportHeight && parentTop + parentHeight > scrollY) {
                const speed = 0.15;
                const offset = (scrollY - parentTop) * speed;
                img.style.transform = `translateY(${offset}px)`;
            }
        });
    });

    // --- 5. Navigation Smooth Scroll (Fix) ---
    document.querySelectorAll('a[href^="#"]:not(#start-project-btn):not(.cta-button)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                // simple scrollIntoView with block: 'start' handles it well with CSS scroll-padding
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });



    // --- 7. Testimonial Drag Scroll ---
    const slider = document.querySelector('.testimonial-scroller-wrapper');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // --- 8. Process Line Scroll Animation ---
    const processSection = document.querySelector('.process');
    const processLine = document.querySelector('.process-line');

    if (processSection && processLine) {
        window.addEventListener('scroll', () => {
            const rect = processSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate progress of the section scroll
            // 0 when top enters middle, 1 when bottom leaves middle
            const startPosition = viewportHeight * 0.8;
            const endPosition = viewportHeight * 0.2;

            let progress = (startPosition - rect.top) / (rect.height + (startPosition - endPosition));
            progress = Math.max(0, Math.min(1, progress));

            const colors = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b'];
            const colorIndex = Math.min(Math.floor(progress * colors.length), colors.length - 1);
            processLine.style.setProperty('--current-color', colors[colorIndex]);
            processLine.style.height = `${progress * 100}%`;
            processLine.style.boxShadow = `0 0 20px ${colors[colorIndex]}44`; // 44 is approx 25% opacity
        });
    }

    // --- 9. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-active');
        });
    });


    initMagnetEffect();

    // Load Footer
    loadFooter();

});

