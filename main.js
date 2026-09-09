/* ==========================================
   JAVASCRIPT PRINCIPAL - BORBOLETA INSTITUT
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Initialiser les fonctionnalités
  initBackToTop();
  initNavigation();
  initFormHandler();
  initSmoothScroll();
  initExpandableCards();
  console.log('Borboleta Institut - App initialized ✓');
}

/* ===== BOUTON RETOUR AU TOP ===== */

function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (!backToTopBtn) return;

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===== NAVIGATION ===== */

function initNavigation() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Fermer le menu mobile si ouvert
        const mobileMenu = document.querySelector('.mobile-menu.active');
        if (mobileMenu) {
          mobileMenu.classList.remove('active');
        }
      }
    });
  });

  // Menu mobile
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }

  // Active nav link based on scroll position
  updateActiveNavLink();
  window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

/* ===== SCROLL FLUIDE ===== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ===== CARTES EXPANSIBLES ===== */

function initExpandableCards() {
  const expandBtns = document.querySelectorAll('[data-expand]');
  
  expandBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const cardContent = this.closest('.card') || this.closest('[data-expandable]');
      const details = cardContent.querySelector('[data-expandable-content]');
      
      if (details) {
        details.classList.toggle('expanded');
        this.classList.toggle('active');
      }
    });
  });
}

/* ===== FORMULAIRES ===== */

function initFormHandler() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleFormSubmit(this);
    });
  });
}

function handleFormSubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  console.log('Form submitted:', data);

  // Validation simple
  if (!validateForm(data)) {
    showMessage('Veuillez remplir tous les champs requuis.', 'error');
    return;
  }

  // Afficher un message de succès
  showMessage('Merci ! Votre message a été reçu. Nous vous contactons très bientôt.', 'success');
  
  // Réinitialiser le formulaire
  form.reset();

  // En production, envoyer les données à un serveur
  // sendFormData(data);
}

function validateForm(data) {
  // Vérifier les champs obligatoires
  const required = ['name', 'email', 'message'];
  for (let field of required) {
    if (!data[field] || data[field].trim() === '') {
      return false;
    }
  }
  
  // Valider l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return false;
  }
  
  return true;
}

function showMessage(message, type = 'info') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message message--${type}`;
  messageDiv.textContent = message;
  messageDiv.setAttribute('role', 'alert');
  
  document.body.appendChild(messageDiv);
  
  // Animation d'entrée
  setTimeout(() => messageDiv.classList.add('show'), 10);
  
  // Supprimer après 5 secondes
  setTimeout(() => {
    messageDiv.classList.remove('show');
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
}

/* ===== UTILITAIRES ===== */

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/* ===== LAZY LOADING (optionnel) ===== */

function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/* ===== STATS COUNTERS (optionnel) ===== */

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 30;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

/* ===== MODAL DIALOG ===== */

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

/* ===== TABS ===== */

function initTabs() {
  const tabButtons = document.querySelectorAll('[role="tab"]');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('aria-controls');
      const tabPanel = document.getElementById(tabId);
      
      // Désactiver tous les tabs
      document.querySelectorAll('[role="tab"]').forEach(tab => {
        tab.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
        panel.hidden = true;
      });
      
      // Activer le tab cliqué
      this.setAttribute('aria-selected', 'true');
      tabPanel.hidden = false;
    });
  });
}

/* ===== ACCORDÉONS ===== */

function initAccordions() {
  const accordionButtons = document.querySelectorAll('[data-accordion-button]');
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const accordionId = this.getAttribute('data-accordion-button');
      const accordionContent = document.querySelector(`[data-accordion="${accordionId}"]`);
      
      if (accordionContent) {
        const isOpen = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isOpen);
        accordionContent.classList.toggle('open');
      }
    });
  });
}

// Exporter les fonctions pour usage externe
window.Borboleta = {
  openModal,
  closeModal,
  showMessage,
  debounce,
  throttle
};
