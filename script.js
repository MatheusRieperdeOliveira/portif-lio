const menuToggle = document.querySelector('.menu-toggle');
const drawer = document.getElementById('mobile-drawer');
const drawerClose = document.querySelector('.drawer-close');
const backdrop = document.querySelector('.drawer-backdrop');

function openDrawer() {
    drawer.classList.add('is-open');
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add('is-visible'));
    drawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
}

function closeDrawer() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
    drawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
        backdrop.hidden = true;
    }, 300);
}

if (menuToggle && drawer && drawerClose && backdrop) {
    menuToggle.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    drawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeDrawer();
        }
    });
}

if (window.lucide) {
    lucide.createIcons();
} else {
    window.addEventListener('DOMContentLoaded', () => {
        if (window.lucide) lucide.createIcons();
    });
}

function contact() {
    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        const feedback = document.querySelector('#contact-feedback');
        const message = document.querySelector('#contact-message');
        const counter = document.querySelector('#message-counter');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');

        const updateCounter = () => {
            counter.textContent = `${message.value.length} / 5000`;
        };

        const showFeedback = (text, state) => {
            feedback.textContent = text;
            feedback.dataset.state = state;
            feedback.hidden = false;
        };

        message.addEventListener('input', updateCounter);

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            const originalText = buttonText.textContent;

            submitButton.disabled = true;
            buttonText.textContent = 'Enviando...';
            feedback.hidden = true;

            try {
                const formData = new FormData(contactForm);

                formData.set('_subject', 'Novo contato pelo portfólio');
                formData.set('_replyto', formData.get('email'));

                const response = await fetch(
                    'https://formsubmit.co/ajax/mrieper87@gmail.com',
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                        },
                        body: formData,
                    }
                );

                const result = await response.json();

                if (!response.ok || result.success === false) {
                    throw new Error('Falha no envio');
                }

                showFeedback(
                    'Mensagem enviada com sucesso! Obrigado pelo contato.',
                    'success'
                );

                contactForm.reset();
                updateCounter();
            } catch {
                showFeedback(
                    'Não foi possível enviar sua mensagem. Tente novamente.',
                    'error'
                );
            } finally {
                submitButton.disabled = false;
                buttonText.textContent = originalText;
            }
        });

        updateCounter();
    }
}
document.addEventListener('DOMContentLoaded', contact);
