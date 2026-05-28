// Zentra MY - Lead Capture Form & Page Logic

document.addEventListener('DOMContentLoaded', () => {
  // ===================
  // Configuration
  // ===================
  const N8N_WEBHOOK_URL = 'https://norbulew.app.n8n.cloud/webhook/5949290a-96cd-4b57-bf1d-a3c2ae39fde7';

  // ===================
  // DOM Elements
  // ===================
  const modal = document.getElementById('leadModal');
  const modalContent = document.getElementById('modalContent');
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtn = document.getElementById('closeModal');
  const form = document.getElementById('leadForm');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const successState = document.getElementById('successState');
  const errorState = document.getElementById('errorState');
  const nextBtn = document.getElementById('nextBtn');
  const backBtn = document.getElementById('backBtn');
  const submitBtn = document.getElementById('submitBtn');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const retryBtn = document.getElementById('retryBtn');
  const stepIndicators = document.querySelectorAll('.step-indicator');

  // Form inputs
  const userNameInput = document.getElementById('userName');
  const userEmailInput = document.getElementById('userEmail');
  const phoneNumberInput = document.getElementById('phoneNumber');
  const companyNameInput = document.getElementById('companyName');
  const monthlyLeadsSelect = document.getElementById('monthlyLeads');
  const biggestChallengeSelect = document.getElementById('biggestChallenge');

  const TOTAL_STEPS = 3;

  // Form data storage
  let formData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    monthlyLeads: '',
    biggestChallenge: ''
  };

  let currentStep = 1;

  // ===================
  // Modal Functions
  // ===================

  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    modalContent.classList.add('modal-enter');

    setTimeout(() => {
      if (userNameInput) userNameInput.focus();
    }, 100);
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    modalContent.classList.remove('modal-enter');

    setTimeout(() => {
      resetForm();
    }, 300);
  }

  function resetForm() {
    form.reset();
    currentStep = 1;
    formData = { name: '', email: '', phone: '', company: '', monthlyLeads: '', biggestChallenge: '' };
    showStep(1);

    successState.classList.add('hidden');
    errorState.classList.add('hidden');
    form.classList.remove('hidden');

    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
      Book My Strategy Call
    `;
  }

  // ===================
  // Step Navigation
  // ===================

  function showStep(step) {
    currentStep = step;
    const steps = [step1, step2, step3];

    steps.forEach((el, index) => {
      if (index + 1 === step) {
        el.classList.remove('step-hidden');
        el.classList.add('step-visible');
      } else {
        el.classList.add('step-hidden');
        el.classList.remove('step-visible');
      }
    });

    // Show/hide navigation buttons
    if (step === 1) {
      nextBtn.classList.remove('hidden');
      backBtn.classList.add('hidden');
      submitBtn.classList.add('hidden');
    } else if (step === TOTAL_STEPS) {
      nextBtn.classList.add('hidden');
      backBtn.classList.remove('hidden');
      submitBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.remove('hidden');
      backBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
    }

    // Focus first input in the step
    setTimeout(() => {
      if (step === 1 && userNameInput) userNameInput.focus();
      if (step === 2 && phoneNumberInput) phoneNumberInput.focus();
      if (step === 3 && monthlyLeadsSelect) monthlyLeadsSelect.focus();
    }, 100);

    // Update step indicators
    stepIndicators.forEach((indicator, index) => {
      if (index < step) {
        indicator.classList.add('bg-green-500');
        indicator.classList.remove('bg-neutral-600');
      } else {
        indicator.classList.remove('bg-green-500');
        indicator.classList.add('bg-neutral-600');
      }
    });
  }

  // ===================
  // Validation
  // ===================

  function validateStep1() {
    const name = userNameInput.value.trim();
    const email = userEmailInput.value.trim();
    clearErrors();

    if (!name) {
      showError('userName', 'Please enter your name');
      return false;
    }
    if (name.length < 2) {
      showError('userName', 'Name must be at least 2 characters');
      return false;
    }

    if (!email) {
      showError('userEmail', 'Please enter your email');
      return false;
    }
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('userEmail', 'Please enter a valid email address');
      return false;
    }

    formData.name = name;
    formData.email = email;
    return true;
  }

  function validateStep2() {
    const phone = phoneNumberInput.value.trim();
    const company = companyNameInput.value.trim();
    clearErrors();

    if (!phone) {
      showError('phoneNumber', 'Please enter your phone number');
      return false;
    }
    if (!/^[\d\s\-+()]+$/.test(phone)) {
      showError('phoneNumber', 'Please enter a valid phone number');
      return false;
    }
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 8) {
      showError('phoneNumber', 'Phone number must have at least 8 digits');
      return false;
    }

    if (!company) {
      showError('companyName', 'Please enter your company name');
      return false;
    }

    formData.phone = phone;
    formData.company = company;
    return true;
  }

  function validateStep3() {
    const leads = monthlyLeadsSelect.value;
    const challenge = biggestChallengeSelect.value;
    clearErrors();

    if (!leads) {
      showError('monthlyLeads', 'Please select your monthly lead volume');
      return false;
    }
    if (!challenge) {
      showError('biggestChallenge', 'Please select your biggest challenge');
      return false;
    }

    formData.monthlyLeads = leads;
    formData.biggestChallenge = challenge;
    return true;
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const errorDiv = document.createElement('p');
    errorDiv.className = 'text-red-400 text-xs mt-1 error-message';
    errorDiv.textContent = message;
    field.classList.add('border-red-500');
    field.parentNode.appendChild(errorDiv);
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.border-red-500').forEach(el => {
      el.classList.remove('border-red-500');
    });
  }

  // ===================
  // Form Submission
  // ===================

  async function submitForm() {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Submitting...
    `;

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          monthlyLeads: formData.monthlyLeads,
          biggestChallenge: formData.biggestChallenge,
          timestamp: new Date().toISOString(),
          source: 'zentra-landing-page'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Lead submitted:', formData);

      // Show success state
      form.classList.add('hidden');
      errorState.classList.add('hidden');
      successState.classList.remove('hidden');

    } catch (error) {
      console.error('Submission error:', error);

      form.classList.add('hidden');
      successState.classList.add('hidden');
      errorState.classList.remove('hidden');

    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        Book My Strategy Call
      `;
    }
  }

  // ===================
  // Event Listeners
  // ===================

  // Open modal buttons
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // Close modal button
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close success button
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', closeModal);
  }

  // Retry button
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      errorState.classList.add('hidden');
      form.classList.remove('hidden');
      showStep(TOTAL_STEPS);
    });
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Next button
  nextBtn.addEventListener('click', () => {
    if (currentStep === 1 && validateStep1()) {
      showStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      showStep(3);
    }
  });

  // Back button
  backBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateStep3()) {
      submitForm();
    }
  });

  // Enter key navigation
  if (userNameInput) {
    userNameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        // Move focus to email instead of advancing step
        if (userEmailInput) userEmailInput.focus();
      }
    });
  }

  if (userEmailInput) {
    userEmailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (validateStep1()) showStep(2);
      }
    });
  }

  if (phoneNumberInput) {
    phoneNumberInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (companyNameInput) companyNameInput.focus();
      }
    });
  }

  if (companyNameInput) {
    companyNameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (validateStep2()) showStep(3);
      }
    });
  }

  // ===================
  // VSL Video Player
  // ===================

  const vslPlayer = document.getElementById('vslPlayer');
  if (vslPlayer) {
    vslPlayer.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/95zOlslwEMY?autoplay=1&rel=0&modestbranding=1';
      iframe.title = 'Zentra AI Demo';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.className = 'absolute inset-0 w-full h-full';
      vslPlayer.innerHTML = '';
      vslPlayer.classList.remove('cursor-pointer', 'group');
      vslPlayer.appendChild(iframe);
    });
  }

  // ===================
  // FAQ Accordion
  // ===================

  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const faqItem = trigger.closest('.faq-item');
      const content = faqItem.querySelector('.faq-content');
      const icon = trigger.querySelector('.faq-icon');

      // Close other open FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.querySelector('.faq-content').classList.add('hidden');
          const otherIcon = item.querySelector('.faq-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current FAQ
      content.classList.toggle('hidden');
      if (icon) {
        icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  });

  // ===================
  // Phone Call Audio Player
  // ===================

  const demoAudio = document.getElementById('demoAudio');
  const demoPlayBtn = document.getElementById('demoPlayBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const audioProgress = document.getElementById('audioProgress');
  const currentTimeEl = document.getElementById('currentTime');
  const totalTimeEl = document.getElementById('totalTime');
  const waveformBars = document.querySelectorAll('.waveform-bar');

  let isPlaying = false;

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function updateProgress() {
    if (demoAudio && demoAudio.duration) {
      const percent = (demoAudio.currentTime / demoAudio.duration) * 100;
      if (audioProgress) audioProgress.style.width = `${percent}%`;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(demoAudio.currentTime);
    }
  }

  function animateWaveform() {
    waveformBars.forEach((bar) => {
      const randomHeight = 20 + Math.random() * 80;
      bar.style.height = `${randomHeight}%`;
      bar.style.transition = 'height 0.15s ease';
    });
  }

  let waveformInterval = null;

  function togglePlay() {
    if (!demoAudio) return;

    if (isPlaying) {
      demoAudio.pause();
      if (playIcon) playIcon.classList.remove('hidden');
      if (pauseIcon) pauseIcon.classList.add('hidden');
      if (waveformInterval) clearInterval(waveformInterval);
    } else {
      demoAudio.play().catch(e => {
        console.log('Audio play failed:', e);
      });
      if (playIcon) playIcon.classList.add('hidden');
      if (pauseIcon) pauseIcon.classList.remove('hidden');
      waveformInterval = setInterval(animateWaveform, 150);
    }
    isPlaying = !isPlaying;
  }

  if (demoPlayBtn) {
    demoPlayBtn.addEventListener('click', togglePlay);
  }

  if (demoAudio) {
    demoAudio.addEventListener('timeupdate', updateProgress);

    demoAudio.addEventListener('loadedmetadata', () => {
      if (totalTimeEl) totalTimeEl.textContent = formatTime(demoAudio.duration);
    });

    demoAudio.addEventListener('ended', () => {
      isPlaying = false;
      if (playIcon) playIcon.classList.remove('hidden');
      if (pauseIcon) pauseIcon.classList.add('hidden');
      if (audioProgress) audioProgress.style.width = '0%';
      if (currentTimeEl) currentTimeEl.textContent = '0:00';
      if (waveformInterval) clearInterval(waveformInterval);
    });
  }
});
