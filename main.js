/**
 * Studio CASA02 — Monograph Scripts
 * Handles mobile navigation, portfolio filtering, and contact form submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.textContent = isOpen ? 'Fechar Menu' : 'Menu';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = 'Menu';
      }
    });
  }

  // 2. Portfolio Filtering (projetos.html)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Toggle active button state
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach((item) => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // 3. Contact Form Submission Feedback (contato.html)
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');

  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById('form-name')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim();
      const projectType = document.getElementById('form-type')?.value;
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !phone) {
        alert('Por favor, preencha os campos obrigatórios (Nome e Telefone/WhatsApp).');
        return;
      }

      // Hide form and show monograph confirmation message
      contactForm.style.display = 'none';
      successMessage.style.display = 'block';

      // Prepare WhatsApp link with prefilled message
      const encodedMsg = encodeURIComponent(
        `Olá! Meu nome é ${name}. Gostaria de solicitar um orçamento para projeto ${projectType || 'Geral'}. Mensagem: ${message || 'Gostaria de agendar uma reunião.'}`
      );
      const whatsappLink = `https://wa.me/5583999999999?text=${encodedMsg}`;
      
      const whatsappDirectBtn = document.getElementById('whatsapp-direct-link');
      if (whatsappDirectBtn) {
        whatsappDirectBtn.setAttribute('href', whatsappLink);
      }
    });
  }
});
