// Main JavaScript for Banjara Journeys

// Sample trips data
const sampleTrips = [
    {
        id: 1,
        title: "Himalayan Expedition",
        description: "Experience the majestic peaks of the Himalayas with expert guides and breathtaking views.",
        price: "₹25,999",
        duration: "7 days",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        difficulty: "Moderate",
        group_size: "8-12 people"
    },
    {
        id: 2,
        title: "Kerala Backwaters",
        description: "Cruise through serene backwaters and experience the beauty of God's own country.",
        price: "₹18,999",
        duration: "5 days",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        difficulty: "Easy",
        group_size: "10-15 people"
    },
    {
        id: 3,
        title: "Rajasthan Desert Safari",
        description: "Explore the golden sands of Thar Desert with camel safari and cultural experiences.",
        price: "₹22,999",
        duration: "6 days",
        image: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: true,
        difficulty: "Easy",
        group_size: "6-10 people"
    }
];

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', (e) => {
                e.preventDefault();
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Load featured trips
function loadFeaturedTrips() {
    const container = document.getElementById('featured-trips');
    if (!container) return;

    const featuredTrips = sampleTrips.filter(trip => trip.featured);

    container.innerHTML = featuredTrips.map(trip => `
        <div class="card-hover bg-white rounded-2xl shadow-lg overflow-hidden group">
            <div class="relative overflow-hidden">
                <img src="${trip.image}" alt="${trip.title}" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span class="text-sm font-bold text-gray-800">${trip.duration}</span>
                </div>
                <div class="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="flex justify-between items-center">
                        <span class="bg-green-500 px-2 py-1 rounded text-xs font-medium">${trip.difficulty}</span>
                        <span class="bg-blue-500 px-2 py-1 rounded text-xs font-medium">${trip.group_size}</span>
                    </div>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-2xl font-bold text-gray-900 mb-3">${trip.title}</h3>
                <p class="text-gray-600 mb-4 leading-relaxed">${trip.description}</p>
                <div class="flex justify-between items-center">
                    <div>
                        <span class="text-3xl font-bold gradient-text">${trip.price}</span>
                        <span class="text-sm text-gray-500 ml-1">per person</span>
                    </div>
                    <a href="book.html?trip=${trip.id}" class="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 shadow-lg">
                        <i class="fas fa-calendar-plus mr-2"></i>Book Now
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Header logo click functionality
function initHeaderLogo() {
    const logoElements = document.querySelectorAll('a[href="index.html"]');
    logoElements.forEach(logo => {
        logo.addEventListener('click', (e) => {
            // If already on home page, scroll to top smoothly
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.classList.add('bg-white/98');
            navbar.classList.remove('bg-white/95');
        } else {
            navbar.classList.add('bg-white/95');
            navbar.classList.remove('bg-white/98');
        }

        // Hide/show navbar on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Animation on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    document.querySelectorAll('.card-hover, .hover-lift').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Newsletter subscription
function initNewsletterSubscription() {
    const form = document.querySelector('footer form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                // Show success message
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            }
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full max-w-sm`;

    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }

    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    // Slide in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('opacity-0');
                    img.classList.add('opacity-100');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            imageObserver.observe(img);
        });
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            data.timestamp = new Date().toISOString();
            
            console.log('Contact form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
}

// Newsletter subscription
function initNewsletter() {
    const newsletterForm = document.querySelector('form');
    if (newsletterForm && newsletterForm.querySelector('input[type="email"]')) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                console.log('Newsletter subscription:', email);
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    }
}

// Initialize all functionality
function initializeApp() {
    initMobileMenu();
    initHeaderLogo();
    initSmoothScrolling();
    initNavbarScroll();
    initScrollAnimations();
    initLazyLoading();
    initContactForm();
    initNewsletter();
    
    // Load featured trips if on home page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        loadFeaturedTrips();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Banjara Journeys website loaded');

    // Initialize features
    initMobileMenu();
    loadFeaturedTrips();
    initSmoothScrolling();
    initNewsletterSubscription();
    initLazyLoading();

    // Add loading animation end
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Handle page visibility change for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations or heavy operations
    } else {
        // Resume animations or operations
    }
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Page is visible, refresh dynamic content if needed
        console.log('Page is now visible');
    }
});

// Export for use in other files
window.BanjaraJourneys = {
    sampleTrips,
    showNotification,
    loadFeaturedTrips
};