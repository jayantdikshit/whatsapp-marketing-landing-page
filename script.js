document.addEventListener('DOMContentLoaded', () => {

    // 0. Header scroll class
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a, .main-nav .btn');

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        });
    });

    // 2. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // 4. Form Submission (Simulated)
    const auditForm = document.getElementById('audit-form');
    const formSuccess = document.getElementById('form-success');
    const backBtn = document.getElementById('back-btn');

    if (auditForm) {
        auditForm.addEventListener('submit', (e) => {
            e.preventDefault();
            auditForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            auditForm.reset();
            formSuccess.classList.add('hidden');
            auditForm.classList.remove('hidden');
        });
    }

    // 5. Scroll Reveal Animation
    const revealElements = document.querySelectorAll(
        '.problem-card, .solution-card, .service-box, .why-card, .industry-card, .expect-card, .journey-step, .faq-item, .testimonial-card, .stat-item, .reveal'
    );

    // Add reveal class to all target elements (only if not already present)
    revealElements.forEach(el => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Stagger animation delay for grid items
    const staggerGroups = [
        '.problem-grid .problem-card',
        '.solutions-grid .solution-card',
        '.services-grid .service-box',
        '.why-grid .why-card',
        '.industries-grid .industry-card',
        '.testimonials-grid .testimonial-card',
        '.stats-grid .stat-item',
    ];

    staggerGroups.forEach(selector => {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
});
