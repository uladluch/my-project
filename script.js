/**
 * Cream Maltipoo / Кремовый Мальтипу
 * Interactive Website Scripts with Multilingual Support (RU / EN)
 */

document.addEventListener('DOMContentLoaded', () => {

  const isRu = (document.documentElement.lang || '').toLowerCase().startsWith('ru');

  /* ==========================================================================
     1. Mobile Menu (Burger Navigation)
     ========================================================================== */
  const burgerBtn = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      burgerBtn.setAttribute('aria-expanded', isOpen);
      burgerBtn.classList.toggle('active', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          burgerBtn.setAttribute('aria-expanded', 'false');
          burgerBtn.classList.remove('active');
        }
      });
    });
  }

  /* ==========================================================================
     2. Header Elevation on Scroll
     ========================================================================== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  /* ==========================================================================
     3. Gallery Filter
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     4. Care Guide Tabs
     ========================================================================== */
  const careTabs = document.querySelectorAll('.care-tab');
  const careContents = document.querySelectorAll('.care-tab-content');

  careTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      careTabs.forEach(t => t.classList.remove('active'));
      careContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     5. FAQ Accordion
     ========================================================================== */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');

    if (item.classList.contains('active') && body) {
      body.style.maxHeight = body.scrollHeight + 'px';
    }

    headerBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.accordion-header');
        const otherBody = otherItem.querySelector('.accordion-body');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        headerBtn.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     6. Interactive Match Quiz
     ========================================================================== */
  const quizSteps = document.querySelectorAll('.quiz-step');
  const progressBar = document.getElementById('quizProgressBar');
  const quizResult = document.getElementById('quizResult');
  const restartQuizBtn = document.getElementById('restartQuizBtn');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');

  let currentStep = 1;
  let totalScore = 0;
  const totalSteps = quizSteps.length;

  function updateQuizProgress() {
    if (progressBar) {
      const percentage = (currentStep / totalSteps) * 100;
      progressBar.style.width = percentage + '%';
    }
  }

  function showStep(stepIndex) {
    quizSteps.forEach(step => {
      step.classList.remove('active');
      if (parseInt(step.getAttribute('data-step')) === stepIndex) {
        step.classList.add('active');
      }
    });
    updateQuizProgress();
  }

  document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const points = parseInt(btn.getAttribute('data-points')) || 2;
      totalScore += points;

      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      } else {
        quizSteps.forEach(step => step.classList.remove('active'));
        if (progressBar) progressBar.style.width = '100%';
        if (quizResult) {
          quizResult.classList.add('active');
          renderQuizResult(totalScore);
        }
      }
    });
  });

  function renderQuizResult(score) {
    if (!resultTitle || !resultDesc) return;

    if (score >= 10) {
      if (isRu) {
        resultTitle.textContent = 'Идеальное совпадение: 99%!';
        resultDesc.textContent = 'Кремовый мальтипу создан именно для вас! Ваша забота, домашний уют и готовность дарить любовь сделают этого малыша самым счастливым членом семьи.';
      } else {
        resultTitle.textContent = '99% Match: Ideal Companion!';
        resultDesc.textContent = 'A Cream Maltipoo is your absolute dream match! Your lifestyle and warmth will give this affectionate pup the happiest forever home.';
      }
    } else if (score >= 7) {
      if (isRu) {
        resultTitle.textContent = 'Отличная совместимость: 85%!';
        resultDesc.textContent = 'Вам прекрасно подойдет мальтипу со спокойным и уравновешенным характером. Мы с удовольствием поможем подобрать щенка с подходящим темпераментом.';
      } else {
        resultTitle.textContent = '85% Match: Wonderful Compatibility!';
        resultDesc.textContent = 'A gentle, relaxed maltipoo will suit your home beautifully. We will happily help select a puppy with the perfect temperament for your lifestyle.';
      }
    } else {
      if (isRu) {
        resultTitle.textContent = 'Хорошая совместимость: 70%!';
        resultDesc.textContent = 'Мальтипу требует ежедневного внимания и общения. Рекомендуем проконсультироваться с кинологом нашего клуба перед окончательным решением.';
      } else {
        resultTitle.textContent = '70% Match: Great Potential!';
        resultDesc.textContent = 'Maltipoos thrive on daily affection and attention. We recommend consulting with our breed specialist to find the ideal routine.';
      }
    }
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      currentStep = 1;
      totalScore = 0;
      if (quizResult) quizResult.classList.remove('active');
      showStep(currentStep);
    });
  }

  /* ==========================================================================
     7. Booking / Inquiry Form Validation & Modal
     ========================================================================== */
  const bookingForm = document.getElementById('bookingForm');
  const userName = document.getElementById('userName');
  const userPhone = document.getElementById('userPhone');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const confirmModalBtn = document.getElementById('confirmModalBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!userName.value.trim()) {
        userName.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        userName.parentElement.classList.remove('has-error');
      }

      // Validate Phone
      const phoneVal = userPhone.value.trim();
      const phoneRegex = /^[\d\+\(\)\s\-]{7,20}$/;
      if (!phoneRegex.test(phoneVal)) {
        userPhone.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        userPhone.parentElement.classList.remove('has-error');
      }

      if (isValid) {
        openModal();
        bookingForm.reset();
        showToast(
          isRu 
            ? 'Заявка успешно принята! Мы скоро свяжемся с вами.'
            : 'Inquiry submitted successfully! We will contact you shortly.'
        );
      }
    });

    userName.addEventListener('input', () => {
      if (userName.value.trim()) {
        userName.parentElement.classList.remove('has-error');
      }
    });

    userPhone.addEventListener('input', () => {
      if (userPhone.value.trim().length >= 7) {
        userPhone.parentElement.classList.remove('has-error');
      }
    });
  }

  function openModal() {
    if (successModal) {
      successModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (successModal) {
      successModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (confirmModalBtn) confirmModalBtn.addEventListener('click', closeModal);

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal && successModal.classList.contains('open')) {
      closeModal();
    }
  });

  /* ==========================================================================
     8. Toast Notification Utility
     ========================================================================== */
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  /* ==========================================================================
     9. Interactive Shade Swatches: Form Sync
     ========================================================================== */
  const colorCards = document.querySelectorAll('.color-card');
  const pupShadeSelect = document.getElementById('pupShade');

  colorCards.forEach(card => {
    card.addEventListener('click', () => {
      colorCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const shade = card.getAttribute('data-shade');
      if (pupShadeSelect) {
        if (shade === 'ivory') pupShadeSelect.value = 'ivory';
        else if (shade === 'vanilla') pupShadeSelect.value = 'classic';
        else if (shade === 'peach') pupShadeSelect.value = 'peach';
        else if (shade === 'biscuit') pupShadeSelect.value = 'biscuit';
      }

      const shadeTitle = card.querySelector('.color-title').textContent;
      showToast(isRu ? `Выбран оттенок: ${shadeTitle}` : `Selected shade: ${shadeTitle}`);
    });
  });

});
