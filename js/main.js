/**
 * Rewan Khaled Yussuf - Portfolio Website Scripts
 * Modern, Minimalist Editorial Design System
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initProjectModals();
  initCertModals();
  initContactForm();
  initScrollSpy();
  initClipboardUtils();
});

/* --- 1. NAVBAR SCROLL STATE --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- 2. MOBILE MENU --- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !mobileNav) return;

  const toggleMenu = () => {
    const isOpen = hamburger.classList.toggle('is-active');
    mobileNav.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    hamburger.classList.remove('is-active');
    mobileNav.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* --- 3. PROJECT DATA & MODAL SYSTEM --- */
const PROJECTS_DATA = {
  ocr: {
    id: 'ocr',
    title: 'OCR Scanner',
    category: 'Computer Vision · Streamlit · OpenCV · Tesseract OCR',
    description: 'Interactive computer vision application for extracting editable text from images using OpenCV and Tesseract OCR.',
    details: [
      'Applied image preprocessing techniques (adaptive thresholding, noise removal) to improve OCR quality.',
      'Integrated text export and download functionality directly within the application.',
      'Created an intuitive, responsive Streamlit interface for seamless document analysis.'
    ],
    image: 'assets/images/project-ocr.svg',
    links: [
      { label: 'View on GitHub', url: 'https://github.com/Rewankhaled812/OCR', isExternal: true }
    ]
  },
  breastCancer: {
    id: 'breastCancer',
    title: 'Breast Cancer Classification',
    category: 'Machine Learning · SVM · Scikit-learn',
    description: 'Machine learning classification system using SVM, feature scaling and hyperparameter optimization.',
    details: [
      'Performed preprocessing and feature scaling using StandardScaler.',
      'Applied GridSearchCV hyperparameter tuning for optimal decision boundary configuration.',
      'Achieved 99.6% classification accuracy with excellent precision and recall.'
    ],
    image: 'assets/images/project-breast-cancer.svg',
    links: [
      { label: 'View on GitHub', url: 'https://github.com/Rewankhaled812/breast-cancer-classification-using-svm', isExternal: true }
    ]
  },
  airQuality: {
    id: 'airQuality',
    title: 'Air Quality Forecasting Analysis',
    category: 'Data Science · Machine Learning',
    description: 'Data-driven forecasting analysis involving data cleaning, EDA, visualization and feature engineering.',
    details: [
      'Prepared multi-variable environmental datasets for machine learning.',
      'Analyzed temporal pollution dynamics and indicator trends.',
      'Performed exploratory data analysis, outlier mitigation, and feature engineering.'
    ],
    image: 'assets/images/project-air-quality.svg',
    links: [
      { label: 'View Project Files (Google Drive)', url: 'https://drive.google.com/drive/folders/1V3MKo-_DSolizl_nJGPIbnKHTtx3hWWK?usp=drive_link', isExternal: true }
    ]
  },
  loanPrediction: {
    id: 'loanPrediction',
    title: 'Loan Prediction Model',
    category: 'Machine Learning · Predictive Modeling',
    description: 'End-to-end machine learning pipeline covering preprocessing, training, evaluation and model comparison.',
    details: [
      'Built robust data preprocessing and categorical encoding pipeline.',
      'Trained and compared classification algorithms including Decision Trees, SVM, KNN, and Random Forest.',
      'Conducted systematic model evaluation with cross-validation and ROC metrics.',
      'Determined optimal production-ready model for credit risk evaluation.'
    ],
    image: 'assets/images/project-loan-prediction.svg',
    links: [
      { label: 'View GitHub Profile', url: 'https://github.com/Rewankhaled812', isExternal: true }
    ]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  if (!modalOverlay) return;

  const modalImg = modalOverlay.querySelector('.modal-preview-media');
  const modalTitle = modalOverlay.querySelector('.modal-project-title');
  const modalCategory = modalOverlay.querySelector('.modal-project-category');
  const modalDesc = modalOverlay.querySelector('.modal-project-desc');
  const modalDetailsList = modalOverlay.querySelector('.modal-details-list');
  const modalFooter = modalOverlay.querySelector('.modal-footer');
  const closeBtn = modalOverlay.querySelector('.modal-close-btn');

  const openModal = (projectId) => {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDesc.textContent = data.description;

    modalDetailsList.innerHTML = '';
    data.details.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      modalDetailsList.appendChild(li);
    });

    modalFooter.innerHTML = '';
    data.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'btn btn-primary btn-sm';
      a.innerHTML = `${link.label} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
      modalFooter.appendChild(a);
    });

    modalOverlay.classList.add('is-open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach trigger clicks
  document.querySelectorAll('[data-project-id]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = el.getAttribute('data-project-id');
      openModal(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* --- 3b. CERTIFICATE LIGHTBOX MODAL --- */
function initCertModals() {
  const certModal = document.getElementById('certModal');
  if (!certModal) return;

  const modalImg = document.getElementById('modalCertImg');
  const modalTitle = document.getElementById('modalCertTitle');
  const modalDownload = document.getElementById('modalCertDownload');
  const closeBtn = document.getElementById('modalCertClose');

  const openCert = (src, title) => {
    if (!src) return;
    modalImg.src = src;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDownload.href = src;
    certModal.classList.add('is-open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCert = () => {
    certModal.classList.remove('is-open');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-cert-src]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-cert-src');
      const title = trigger.getAttribute('data-cert-title') || 'Certificate';
      openCert(src, title);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCert);

  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeCert();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('is-open')) {
      closeCert();
    }
  });
}

/* --- 4. CONTACT FORM --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  if (!form || !statusEl) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in all fields before sending.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Direct mailto fallback link preparation
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:rewankhaled812@gmail.com?subject=${subject}&body=${body}`;

    showStatus('Opening your default mail client to deliver message to rewankhaled812@gmail.com...', 'success');
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
      form.reset();
    }, 700);
  });

  function showStatus(text, type) {
    statusEl.textContent = text;
    statusEl.className = `form-status ${type}`;
    statusEl.style.display = 'block';

    if (type === 'error') {
      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 5000);
    }
  }
}

/* --- 5. SCROLL SPY (NAV HIGHLIGHTING) --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* --- 6. TOAST / CLIPBOARD UTILITIES --- */
function initClipboardUtils() {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;

  window.copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.textContent = `${label} copied to clipboard!`;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2600);
    }).catch(() => {
      toast.textContent = text;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2600);
    });
  };
}
