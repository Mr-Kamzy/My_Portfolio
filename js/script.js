/* ============================================================
   PORTFOLIO SCRIPT
   Vanilla JS — no dependencies except EmailJS (optional, see CONTACT FORM)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- PRELOADER ---------------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('done'), 500);
  });
  // Fallback in case 'load' is slow/blocked
  setTimeout(() => preloader.classList.add('done'), 2500);

  /* ---------------- YEAR ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------- STICKY NAV ---------------- */
  const navWrap = document.getElementById('navWrap');
  const onScroll = () => {
    navWrap.classList.toggle('scrolled', window.scrollY > 40);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- MOBILE NAV TOGGLE ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  }));

  /* ---------------- ACTIVE NAV LINK ON SCROLL ---------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.dataset.section === entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach(s => sectionObserver.observe(s));

  /* ---------------- SCROLL REVEAL ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------- TYPING EFFECT ---------------- */
  const typedEl = document.getElementById('typedText');
  const roles = ['Photographer', 'Videographer', 'Frontend Developer', 'Python Developer'];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1500);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 85);
  }
  typeLoop();

  /* ---------------- PARALLAX HERO ---------------- */
  const parallaxLayer = document.getElementById('parallaxLayer');
  const heroSection = document.querySelector('.hero');
  document.addEventListener('mousemove', (e) => {
    if (!parallaxLayer || window.innerWidth < 981) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    parallaxLayer.style.transform = `translate(${x}px, ${y}px)`;
  });
  document.addEventListener('scroll', () => {
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    if (rect.bottom > 0) {
      const offset = window.scrollY * 0.25;
      heroSection.style.setProperty('--parallax-y', `${offset}px`);
    }
  }, { passive: true });

  /* ---------------- ANIMATED COUNTERS ---------------- */
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const duration = 1600;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.round(eased * target);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  statNums.forEach(el => counterObserver.observe(el));

  /* ---------------- SKILL BARS ---------------- */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillFills.forEach(el => skillObserver.observe(el));

  /* ---------------- BUTTON RIPPLE ---------------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--rx', `${e.clientX - rect.left}px`);
      btn.style.setProperty('--ry', `${e.clientY - rect.top}px`);
      btn.classList.remove('rippling');
      // force reflow to restart animation
      void btn.offsetWidth;
      btn.classList.add('rippling');
    });
  });

  /* ---------------- LIGHTBOX GALLERY ---------------- */
  const masonryImgs = Array.from(document.querySelectorAll('.masonry-item img'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  let lbIndex = 0;

  function openLightbox(i) {
    lbIndex = i;
    lightboxImg.src = masonryImgs[i].src;
    lightboxImg.alt = masonryImgs[i].alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function showRelative(delta) {
    lbIndex = (lbIndex + delta + masonryImgs.length) % masonryImgs.length;
    lightboxImg.src = masonryImgs[lbIndex].src;
    lightboxImg.alt = masonryImgs[lbIndex].alt;
  }

  masonryImgs.forEach((img, i) => img.parentElement.addEventListener('click', () => openLightbox(i)));
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => showRelative(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => showRelative(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showRelative(-1);
    if (e.key === 'ArrowRight') showRelative(1);
  });

  /* ---------------- TESTIMONIAL SLIDER ---------------- */
  const testiTrack = document.getElementById('testiTrack');
  const testiCards = document.querySelectorAll('.testimonial-card');
  const testiDotsWrap = document.getElementById('testiDots');
  let testiIndex = 0;

  testiCards.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTesti(i));
    testiDotsWrap.appendChild(dot);
  });
  const dots = testiDotsWrap.querySelectorAll('button');

  function goToTesti(i) {
    testiIndex = i;
    testiTrack.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === i));
  }
  setInterval(() => goToTesti((testiIndex + 1) % testiCards.length), 5500);

  /* ---------------- CONTACT FORM (EmailJS) ---------------- */
  /*
    To activate real email delivery:
    1. Sign up at https://www.emailjs.com and create a Service + Template.
    2. Include the SDK in index.html, before this script:
       <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    3. Replace the placeholders below with your own IDs.
    4. Uncomment the emailjs.init() and emailjs.send() calls.
  */
  const YOUR_EMAILJS_PUBLIC_KEY = 'L9GVvhBf8qKG9khqZ';
  const YOUR_EMAILJS_SERVICE_ID = 'service_inp6bwb';
  const YOUR_EMAILJS_TEMPLATE_ID = 'template_qo1avda';

  //if (window.emailjs) 
  emailjs.init(YOUR_EMAILJS_PUBLIC_KEY);

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const cfSubmit = document.getElementById('cfSubmit');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.className = 'form-status';
    cfSubmit.disabled = true;
    cfSubmit.style.opacity = '0.7';

    const finish = (ok, msg) => {
      formStatus.textContent = msg;
      formStatus.classList.add(ok ? 'ok' : 'err');
      cfSubmit.disabled = false;
      cfSubmit.style.opacity = '1';
      if (ok) contactForm.reset();
    };

    if (window.emailjs) {
      emailjs.sendForm(YOUR_EMAILJS_SERVICE_ID, YOUR_EMAILJS_TEMPLATE_ID, contactForm)
        .then(() => finish(true, "Message sent — I'll get back to you soon."))
        .catch(() => finish(false, 'Something went wrong. Please try again or email me directly.'));
    } else {
      // EmailJS SDK not included — demo/placeholder behavior.
      setTimeout(() => {
        finish(true, "Message captured. Connect EmailJS (see script.js) to deliver this to your inbox.");
      }, 900);
    }
  });

  /* ---------------- BACK TO TOP ---------------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});
