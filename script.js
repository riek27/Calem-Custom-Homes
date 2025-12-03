// script.js - Calem Custom Homes

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('open');
            if (navLinks) navLinks.classList.remove('active');
        });
    });
    
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize components based on page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage.includes('index.html') || currentPage === '') {
        initHomePage();
    }
    
    if (currentPage.includes('services.html')) {
        initServicesPage();
    }
    
    if (currentPage.includes('gallery.html')) {
        initGalleryPage();
    }
    
    if (currentPage.includes('testimonials.html')) {
        initTestimonialsPage();
    }
    
    if (currentPage.includes('contact.html')) {
        initContactPage();
    }
    
    // Initialize common components
    initScrollAnimations();
    initNewsletterForm();
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage.includes(linkPage.replace('.html', '')) && linkPage !== 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize home page specific functionality
function initHomePage() {
    // Hero section parallax
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const rate = scrolled * 0.5;
            heroSection.style.backgroundPosition = `center ${rate}px`;
        }
    });
}

// Initialize services page functionality
function initServicesPage() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentNode;
            const content = this.nextElementSibling;
            
            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });
}

// Initialize gallery page functionality
function initGalleryPage() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    if (!galleryItems.length || !lightbox) return;
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt
    }));
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
    }
    
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });
}

// Initialize testimonials page functionality
function initTestimonialsPage() {
    const testimonialTrack = document.getElementById('testimonial-track');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (!testimonialTrack || !testimonialDots.length) return;
    
    let currentSlide = 0;
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });
    
    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        testimonialDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Auto-advance testimonials
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialDots.length;
        updateSlider();
    }, 5000);
}

// Initialize contact page functionality
function initContactPage() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            
            // Show success message
            alert(`Thank you, ${name}! Your message has been sent. We'll contact you shortly.`);
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateOnScroll = document.querySelectorAll('.about-image, .about-content, .gallery-item, .blog-card, .service-card, .contact-form, .map-container');
    animateOnScroll.forEach(el => {
        observer.observe(el);
    });
}

// Initialize newsletter form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    }
}
