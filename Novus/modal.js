document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Modal HTML
    const modalHTML = `
    <div id="contact-modal" class="modal-overlay">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="modal-header">
                <span class="modal-label">Start a Project</span>
                <h2 class="modal-title">Let's Create<br>Impact</h2>
            </div>
            <div class="contact-options">
                <a href="https://t.me/+919106475234" target="_blank" class="contact-option telegram">
                    <div class="icon-box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.2647 2.42773C21.98 2.19087 21.6364 2.03563 21.2704 1.97854C20.9045 1.92145 20.5299 1.96464 20.1866 2.10352L2.26566 9.33887C1.88241 9.49656 1.55618 9.76706 1.33026 10.1145C1.10434 10.4619 0.989427 10.8698 1.00076 11.2841C1.0121 11.6984 1.14916 12.0994 1.39374 12.4339C1.63832 12.7685 1.97886 13.0207 2.37016 13.1572L5.99516 14.418L8.01566 21.0996C8.04312 21.1889 8.08297 21.2738 8.13404 21.352C8.14179 21.364 8.15272 21.3729 8.16096 21.3846C8.21996 21.4669 8.29127 21.5397 8.37239 21.6004C8.39546 21.6179 8.41755 21.6344 8.44221 21.65C8.53714 21.713 8.64228 21.7591 8.75294 21.7861L8.76478 21.7871L8.77149 21.79C8.83802 21.8036 8.90574 21.8104 8.97364 21.8105C8.98017 21.8105 8.98597 21.8074 8.99244 21.8073C9.0949 21.8055 9.19647 21.7878 9.29353 21.755C9.31611 21.7473 9.33546 21.7344 9.35737 21.7251C9.42975 21.6951 9.49832 21.6567 9.56166 21.6106C9.61238 21.5678 9.66312 21.5251 9.71388 21.4824L12.416 18.499L16.4463 21.6211C16.8011 21.8973 17.2379 22.0475 17.6875 22.0478C18.1587 22.0472 18.6154 21.8847 18.9809 21.5874C19.3465 21.2901 19.5987 20.8762 19.6954 20.415L22.958 4.39844C23.032 4.03796 23.0065 3.66416 22.8844 3.31703C22.7623 2.9699 22.5481 2.66251 22.2647 2.42773ZM9.37016 14.7363C9.2315 14.8744 9.13672 15.0504 9.0977 15.2422L8.78819 16.7462L8.00413 14.1531L12.0694 12.0362L9.37016 14.7363ZM17.6719 20.04L12.9092 16.3506C12.71 16.1966 12.46 16.1233 12.2092 16.1454C11.9583 16.1675 11.725 16.2833 11.5557 16.4697L10.6903 17.4249L10.9961 15.9384L18.0791 8.85544C18.2482 8.68661 18.3512 8.4628 18.3695 8.22457C18.3878 7.98633 18.3201 7.74943 18.1788 7.55676C18.0375 7.36409 17.8319 7.22841 17.5992 7.17428C17.3664 7.12015 17.122 7.15116 16.9102 7.26169L6.74491 12.5543L3.02055 11.1914L20.999 3.999L17.6719 20.04Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="option-text">
                        <span class="platform">Telegram</span>
                        <span class="handle">+91 91064 75234</span>
                    </div>
                    <div class="hover-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </a>
                
                <a href="https://wa.me/919106475234" target="_blank" class="contact-option whatsapp">
                    <div class="icon-box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6 14C16.4 13.9 15.1 13.3 14.9 13.2C14.7 13.1 14.5 13.1 14.3 13.3C14.1 13.5 13.7 14.1 13.5 14.3C13.4 14.5 13.2 14.5 13 14.4C12.3 14.1 11.6 13.7 11 13.2C10.5 12.7 10 12.1 9.6 11.5C9.5 11.3 9.6 11.1 9.7 11C9.8 10.9 9.9 10.7 10.1 10.6C10.2 10.5 10.3 10.3 10.3 10.2C10.4 10.1 10.4 9.90001 10.3 9.80001C10.2 9.70001 9.7 8.50001 9.5 8.00001C9.4 7.30001 9.2 7.30001 9 7.30001H8.5C8.3 7.30001 8 7.50001 7.9 7.60001C7.3 8.20001 7 8.90001 7 9.70001C7.1 10.6 7.4 11.5 8 12.3C9.1 13.9 10.5 15.2 12.2 16C12.7 16.2 13.1 16.4 13.6 16.5C14.1 16.7 14.6 16.7 15.2 16.6C15.9 16.5 16.5 16 16.9 15.4C17.1 15 17.1 14.6 17 14.2L16.6 14ZM19.1 4.90001C15.2 1.00001 8.9 1.00001 5 4.90001C1.8 8.10001 1.2 13 3.4 16.9L2 22L7.3 20.6C8.8 21.4 10.4 21.8 12 21.8C17.5 21.8 21.9 17.4 21.9 11.9C22 9.30001 20.9 6.80001 19.1 4.90001ZM16.4 18.9C15.1 19.7 13.6 20.2 12 20.2C10.5 20.2 9.1 19.8 7.8 19.1L7.5 18.9L4.4 19.7L5.2 16.7L5 16.4C2.6 12.4 3.8 7.40001 7.7 4.90001C11.6 2.40001 16.6 3.70001 19 7.50001C21.4 11.4 20.3 16.5 16.4 18.9Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="option-text">
                        <span class="platform">WhatsApp</span>
                        <span class="handle">+91 91064 75234</span>
                    </div>
                    <div class="hover-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </a>
                
                <a href="mailto:hello@novus.agency" class="contact-option email">
                    <div class="icon-box">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="option-text">
                        <span class="platform">Email</span>
                        <span class="handle">hello@novus.agency</span>
                    </div>
                    <div class="hover-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </a>
            </div>
            <p class="modal-footer">We typically respond within 2 hours.</p>
        </div>
    </div>
    `;

    // Only inject if it doesn't exist (safety check)
    if (!document.getElementById('contact-modal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 2. Logic
    const contactModal = document.getElementById('contact-modal');
    const modalCloseBtn = contactModal ? contactModal.querySelector('.modal-close') : null;

    // Select all Start Project buttons (both ID and class)
    const startProjectBtns = document.querySelectorAll('#start-project-btn, .cta-button, a[href="#contact"], a[href$="#contact"]');

    function openModal() {
        if (contactModal) {
            contactModal.style.display = 'flex';
            // force reflow
            void contactModal.offsetWidth;
            contactModal.classList.add('is-open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeModal() {
        if (contactModal) {
            contactModal.classList.remove('is-open');
            setTimeout(() => {
                contactModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 400); // Match transition duration
        }
    }

    // Attach click listeners to all buttons
    startProjectBtns.forEach(btn => {
        // Check if it's actually a start project button (text content check to be safe, or just trust the class)
        if (btn.textContent.includes('Start Project') || btn.textContent.includes('Start a Conversation')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            // Close if clicking overlay or backdrop
            if (e.target === contactModal || e.target.classList.contains('modal-backdrop')) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('is-open')) {
            closeModal();
        }
    });
});
