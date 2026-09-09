/**
 * KESARI FACILITY MANAGEMENT (KFM) BANGALORE
 * Interactive Scripts — Styled under Toyota Bharat Design Architecture
 */

// Force scroll to top on page refresh/reload & disable automatic browser scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  initHeroCarousel();
  initServiceFilters();
  initStandardsVisualizer();
  initFacilityStaffEstimator();
  initProposalForm();
  initModals();
  initMobileDrawer();
  initHeaderScroll();
  initSmoothScroll();
});

/* ==========================================================================
   1. HERO CAROUSEL AUTO-PLAY & CONTROLS
   ========================================================================== */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (!slides.length) return;

  let currentSlide = 0;
  let autoSlideTimer = null;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoSlideTimer = setInterval(nextSlide, 3000);
  }

  function stopAutoPlay() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAutoPlay();
    });
  });

  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoPlay);
    heroSection.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}

/* ==========================================================================
   2. 11 SERVICES CATEGORY FILTER TABS
   ========================================================================== */
function initServiceFilters() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.car-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category').split(' ');
        if (filterCategory === 'all' || cardCategories.includes(filterCategory)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   3. QUALITY STANDARDS & PROPERTY FOCUS VISUALIZER
   ========================================================================== */
function initStandardsVisualizer() {
  const colorChips = document.querySelectorAll('.color-chip');
  const activeFocusLabel = document.getElementById('activeColorName');
  const showroomImg = document.getElementById('showroomCarImg');

  const focusMap = {
    white: {
      name: 'Residential Apartment Societies (RPOA)',
      img: 'images/watermark-housekeeping.jpg'
    },
    black: {
      name: 'Commercial IT Parks & Corporate Offices',
      img: 'images/watermark-multitech.jpg'
    },
    red: {
      name: 'High-Security Tech Hubs & Data Centers',
      img: 'images/watermark-security.png'
    },
    silver: {
      name: 'Industrial Warehouses & Factories',
      img: 'images/watermark-stp.jpg'
    },
    bronze: {
      name: 'Retail Malls & Commercial Showrooms',
      img: 'images/watermark-cctv.jpg'
    }
  };

  colorChips.forEach(chip => {
    chip.addEventListener('click', () => {
      colorChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const colorKey = chip.getAttribute('data-color');
      const data = focusMap[colorKey];

      if (data) {
        if (activeFocusLabel) activeFocusLabel.textContent = data.name;
        if (showroomImg) {
          showroomImg.style.opacity = '0.4';
          setTimeout(() => {
            showroomImg.src = data.img;
            showroomImg.style.opacity = '1';
          }, 150);
        }
      }
    });
  });
}

/* ==========================================================================
   4. WORKER & STAFFING REQUIREMENT CALCULATOR (NO COST/BUDGET DISPLAY)
   ========================================================================== */
function initFacilityStaffEstimator() {
  const propSelect = document.getElementById('propertyTypeSelect');
  const areaRange = document.getElementById('areaRange');
  const areaDisplay = document.getElementById('areaValDisplay');
  const guardsRange = document.getElementById('guardsRange');
  const guardsDisplay = document.getElementById('guardsValDisplay');
  const hkRange = document.getElementById('hkRange');
  const hkDisplay = document.getElementById('hkValDisplay');

  const totalWorkersVal = document.getElementById('totalWorkersVal');
  const guardsSummaryVal = document.getElementById('guardsSummaryVal');
  const hkSummaryVal = document.getElementById('hkSummaryVal');
  const areaScopeSummaryVal = document.getElementById('areaScopeSummaryVal');

  if (!areaRange) return;

  function calculateStaffRequirement() {
    const units = parseInt(areaRange.value);
    const sqft = units * 500;
    const guards = parseInt(guardsRange.value);
    const hkStaff = parseInt(hkRange.value);
    const totalWorkers = guards + hkStaff;

    const propTypeName = propSelect ? propSelect.options[propSelect.selectedIndex].text : 'Gated Property';

    if (areaDisplay) areaDisplay.textContent = `${units} Units (~${sqft.toLocaleString('en-IN')} sq ft)`;
    if (guardsDisplay) guardsDisplay.textContent = `${guards} Guard(s) (${Math.ceil(guards/2)} Shift 24x7)`;
    if (hkDisplay) hkDisplay.textContent = `${hkStaff} Housekeeper(s) (8 Hr Shift)`;

    if (totalWorkersVal) totalWorkersVal.textContent = `${totalWorkers} Workers Total`;
    if (guardsSummaryVal) guardsSummaryVal.textContent = `${guards} Guard(s) (24x7 Manning)`;
    if (hkSummaryVal) hkSummaryVal.textContent = `${hkStaff} Housekeeping Staff (Daily)`;
    if (areaScopeSummaryVal) areaScopeSummaryVal.textContent = `${units} Units (~${sqft.toLocaleString('en-IN')} sq ft ${propTypeName})`;
  }

  if (propSelect) propSelect.addEventListener('change', calculateStaffRequirement);
  areaRange.addEventListener('input', calculateStaffRequirement);
  guardsRange.addEventListener('input', calculateStaffRequirement);
  hkRange.addEventListener('input', calculateStaffRequirement);

  calculateStaffRequirement();
}

/* ==========================================================================
   5. PROPOSAL REQUEST FORM
   ========================================================================== */
function initProposalForm() {
  const proposalForm = document.getElementById('proposalRequestForm');
  if (!proposalForm) return;

  proposalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('🎉 Staffing Proposal Request Received! KFM Operational Team will contact you within 2 hours.');
    proposalForm.reset();
  });
}

/* ==========================================================================
   6. GLOBAL MODAL DIALOGS & TOAST NOTIFICATIONS
   ========================================================================== */
function initModals() {
  const modalBackdrop = document.getElementById('globalModalBackdrop');
  const modalCloseBtns = document.querySelectorAll('.modal-close');
  const quoteForm = document.getElementById('quoteRequestForm');

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('✅ Thank you! Your Staffing Proposal Request has been sent to Kesari Facility Management.');
      quoteForm.reset();
    });
  }
}

function openQuoteModal(serviceName = '') {
  const modalBackdrop = document.getElementById('globalModalBackdrop');
  const serviceSelect = document.getElementById('modalServiceSelect');

  if (serviceSelect && serviceName) {
    for (let opt of serviceSelect.options) {
      if (opt.text.toLowerCase().includes(serviceName.toLowerCase()) || opt.value.toLowerCase().includes(serviceName.toLowerCase())) {
        opt.selected = true;
        break;
      }
    }
  }
  if (modalBackdrop) modalBackdrop.classList.add('active');
}

function closeModal() {
  const modalBackdrop = document.getElementById('globalModalBackdrop');
  if (modalBackdrop) modalBackdrop.classList.remove('active');
}

function showToast(msg) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   7. MOBILE DRAWER NAVIGATION (3-LINES MENU TOGGLE)
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sub-link');

  function openDrawer() {
    if (toggleBtn) toggleBtn.classList.add('active');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    if (mobileDrawer) mobileDrawer.classList.add('active');
  }

  function closeDrawer() {
    if (toggleBtn) toggleBtn.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    if (mobileDrawer) mobileDrawer.classList.remove('active');
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

function closeMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (toggleBtn) toggleBtn.classList.remove('active');
  if (drawerOverlay) drawerOverlay.classList.remove('active');
  if (mobileDrawer) mobileDrawer.classList.remove('active');
}

/* ==========================================================================
   8. HEADER SCROLL STICKY SHADOW
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   9. GLOBAL SMOOTH SCROLLING FOR ANCHOR LINKS
   ========================================================================== */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        closeMobileDrawer();

        const headerHeight = document.querySelector('.header')?.offsetHeight || 75;
        const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}
