const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -20px 0px"
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

function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    const html = `<footer>
    <div class="container footer-content">
        <div class="footer-left">
            <a href="index.html" class="logo">NOVUS<span class="dot">.</span></a>
            <p>Designed for the ambitious.</p>
            <div class="footer-meta">
                <span>Vadodara, Gujarat, India</span>
                <br>
                <a href="mailto:hello@novus.agency">hello@novus.agency</a>
            </div>
        </div>
        <div class="footer-links">
            <div class="link-column">
                <h4>Navigation</h4>
                <a href="index.html">Home</a>
                <a href="work.html">Work</a>
                <a href="services.html">Services</a>
                <a href="seo.html">SEO</a>
            </div>
            <div class="link-column">
                <h4>Socials</h4>
                <a href="#">Instagram</a>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
            </div>
            <div class="link-column">
                <h4>Legals</h4>
                <a href="privacy-policy.html">Privacy Policy</a>
            </div>
        </div>
    </div>
    <div class="container copyright">
        <p>&copy; <span id="copyright-year">2026</span> Novus Agency. All Rights Reserved.</p>
    </div>
</footer>`;

    placeholder.innerHTML = html;

    // Re-run observer for the new content
    placeholder.querySelectorAll('.reveal-on-scroll, .reveal-text').forEach(el => observer.observe(el));

    // Update year
    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
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

    // --- 8. Process Line Scroll Animation & Mobile Card Focus ---
    const processSection = document.querySelector('.process');
    const processLine = document.querySelector('.process-line');
    const processSteps = document.querySelectorAll('.process-step-v2');

    if (processSection && (processLine || processSteps.length > 0)) {
        window.addEventListener('scroll', () => {
            const rect = processSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // 8a. Line Animation
            if (processLine) {
                const startPosition = viewportHeight * 0.8;
                const endPosition = viewportHeight * 0.2;

                let progress = (startPosition - rect.top) / (rect.height + (startPosition - endPosition));
                progress = Math.max(0, Math.min(1, progress));

                const colors = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b'];
                const colorIndex = Math.min(Math.floor(progress * colors.length), colors.length - 1);
                processLine.style.setProperty('--current-color', colors[colorIndex]);
                processLine.style.height = `${progress * 100}%`;
                processLine.style.boxShadow = `0 0 20px ${colors[colorIndex]}44`;
            }

            // 8b. Mobile Card Focus
            if (window.innerWidth <= 900) {
                let closestStep = null;
                let minDistance = Infinity;
                const centerY = viewportHeight / 2;

                processSteps.forEach(step => {
                    const stepRect = step.getBoundingClientRect();
                    const stepCenter = stepRect.top + stepRect.height / 2;
                    const distance = Math.abs(centerY - stepCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestStep = step;
                    }
                });

                processSteps.forEach(step => {
                    if (step === closestStep) {
                        step.classList.add('is-active');
                    } else {
                        step.classList.remove('is-active');
                    }
                });
            } else {
                processSteps.forEach(step => step.classList.remove('is-active'));
            }
        });
    }

    // --- 9. Services, SEO, Brand & Product Page Mobile Focus ---
    const scrollFocusItems = document.querySelectorAll('.minimal-service-item, .growth-item, .brand-panel, .method-card');
    if (scrollFocusItems.length > 0) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 900) {
                const viewportHeight = window.innerHeight;
                const centerY = viewportHeight / 2;
                let closestItem = null;
                let minDistance = Infinity;

                scrollFocusItems.forEach(item => {
                    const rect = item.getBoundingClientRect();
                    const itemCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(centerY - itemCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestItem = item;
                    }
                });

                scrollFocusItems.forEach(item => {
                    if (item === closestItem) {
                        item.classList.add('is-active');
                    } else {
                        item.classList.remove('is-active');
                    }
                });
            } else {
                scrollFocusItems.forEach(item => item.classList.remove('is-active'));
            }
        });
    }

    // --- 10. Location Mobile Interactivity ---
    const locationNames = document.querySelectorAll('.location-name');
    locationNames.forEach(loc => {
        let touchStartX = 0;

        // Click to toggle
        loc.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                const isActive = loc.classList.contains('is-active');
                locationNames.forEach(l => l.classList.remove('is-active'));
                if (!isActive) loc.classList.add('is-active');
            }
        });

        // Swipe detection
        loc.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        loc.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = Math.abs(touchEndX - touchStartX);

            if (window.innerWidth <= 900 && swipeDistance > 30) {
                locationNames.forEach(l => l.classList.remove('is-active'));
                loc.classList.add('is-active');
            }
        }, { passive: true });
    });

    // --- 11. Palette Swatch Mobile Interactivity ---
    const swatches = document.querySelectorAll('.swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                const isActive = swatch.classList.contains('is-active');
                swatches.forEach(s => s.classList.remove('is-active'));
                if (!isActive) swatch.classList.add('is-active');
            }
        });
    });

    // --- 12. Clean up active states on resize & Prevent Animation Blinks ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);

        if (window.innerWidth > 900) {
            document.querySelectorAll('.is-active').forEach(el => el.classList.remove('is-active'));
        }
    });

    // --- 13. Mobile Menu Toggle ---
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

