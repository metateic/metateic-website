// Metateic standalone JS: reveal animations, scroll progress, slideshow, and form UX.
(() => {
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  // Scroll progress
  const progress = document.querySelector('.scroll-progress');
  const onScroll = () => {
    if (!progress) return;
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    progress.style.width = pct.toFixed(2) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        if (navLinks.classList.contains('active')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navLinks.classList.remove('active');
        }
      }
    });
  }

  // Reveal on view
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  // Slideshow
  const wrap = document.querySelector('.slideshow-wrapper');
  if (wrap) {
    const slides = Array.from(wrap.querySelectorAll('.slide'));
    const prevBtn = wrap.querySelector('.slideshow-prev');
    const nextBtn = wrap.querySelector('.slideshow-next');
    const dots = Array.from(wrap.querySelectorAll('.slideshow-indicator'));
    let idx = slides.findIndex(s => s.classList.contains('active'));
    if (idx < 0) idx = 0;

    const setActive = (next) => {
      idx = (next + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === idx);
        d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
    };

    prevBtn?.addEventListener('click', () => setActive(idx - 1));
    nextBtn?.addEventListener('click', () => setActive(idx + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => setActive(i)));

    // Keyboard support
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') setActive(idx - 1);
      if (e.key === 'ArrowRight') setActive(idx + 1);
    });

    // Autoplay
    const autoplay = wrap.dataset.autoplay === 'true' && !prefersReduced;
    const interval = Math.max(2000, Number(wrap.dataset.interval || 7000));
    let timer = null;

    const start = () => {
      if (!autoplay || slides.length < 2) return;
      stop();
      timer = window.setInterval(() => setActive(idx + 1), interval);
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    // Pause on hover / focus
    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', start);
    wrap.addEventListener('focusin', stop);
    wrap.addEventListener('focusout', start);

    setActive(idx);
    start();
  }

  // Phone number formatting
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
      if (value.length > 0) {
        if (value.length <= 3) {
          value = `(${value}`;
        } else if (value.length <= 6) {
          value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
          value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
      }
      e.target.value = value;
    });

    phoneInput.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && e.target.value.length === 1) {
        e.target.value = '';
      }
    });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    const msg = form.querySelector('.form-message');
    const loader = form.querySelector('.button-loader');
    if (loader) loader.style.display = 'none';
    
    const strings = window.SITE_STRINGS || {};
    const emailjsConfig = strings.contact?.emailjs || {};
    const formStrings = strings.contact?.form || {};

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!emailjsConfig.service_id || !emailjsConfig.template_id || !emailjsConfig.public_key) {
        console.error('EmailJS not configured. Please set EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, and EMAILJS_TEMPLATE_ID secrets.');
        if (msg) {
          msg.textContent = formStrings.error || 'Sorry, there was an error sending your message. Please try again.';
          msg.classList.add('show');
        }
        return;
      }

      form.classList.add('loading');
      if (loader) loader.style.display = 'inline';
      const btnText = form.querySelector('.button-text');
      if (btnText) btnText.style.display = 'none';
      if (msg) {
        msg.textContent = '';
        msg.classList.remove('show');
      }

      // Strip formatting from phone before sending (EmailJS will use the form field value)
      const phoneInput = form.querySelector('[name="phone"]');
      const originalPhoneValue = phoneInput ? phoneInput.value : '';
      if (phoneInput && originalPhoneValue) {
        phoneInput.value = originalPhoneValue.replace(/\D/g, '');
      }

      try {
        if (!emailjs.init) {
          emailjs.init(emailjsConfig.public_key);
        }
        // Use sendForm to automatically map form fields to template
        const response = await emailjs.sendForm(
          emailjsConfig.service_id,
          emailjsConfig.template_id,
          form
        );

        // Success
        form.reset();
        form.classList.remove('loading');
        if (loader) loader.style.display = 'none';
        if (btnText) btnText.style.display = 'inline';
        if (msg) {
          msg.textContent = formStrings.success || 'Thanks! Your message has been sent successfully.';
          msg.classList.add('show');
        }
      } catch (error) {
        // Restore formatted phone value on error
        if (phoneInput && originalPhoneValue) {
          phoneInput.value = originalPhoneValue;
        }
        console.error('EmailJS error:', error);
        form.classList.remove('loading');
        if (loader) loader.style.display = 'none';
        if (btnText) btnText.style.display = 'inline';
        if (msg) {
          msg.textContent = formStrings.error || 'Sorry, there was an error sending your message. Please try again.';
          msg.classList.add('show');
        }
      }
    });
  }
})();
