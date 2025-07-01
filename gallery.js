
// Enhanced Gallery JavaScript with Fixed Modal Support

// Sample gallery images with more variety
const galleryImages = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "landscapes",
        title: "Himalayan Peaks",
        description: "Breathtaking view of snow-capped mountains",
        tags: ["mountains", "snow", "peaks", "nature"]
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "adventures",
        title: "River Rafting",
        description: "Thrilling white water rafting experience",
        tags: ["water", "rafting", "adventure", "extreme"]
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1539650116574-75c0c6d24edc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "culture",
        title: "Ancient Temple",
        description: "Historic architecture showcasing rich heritage",
        tags: ["temple", "architecture", "heritage", "ancient"]
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "wildlife",
        title: "Safari Adventure",
        description: "Close encounter with magnificent wildlife",
        tags: ["safari", "wildlife", "animals", "nature"]
    },
    {
        id: 5,
        url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "adventures",
        title: "Mountain Trekking",
        description: "Adventurous trek through scenic mountains",
        tags: ["trekking", "mountains", "hiking", "adventure"]
    },
    {
        id: 6,
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "landscapes",
        title: "Serene Lake",
        description: "Crystal clear lake surrounded by mountains",
        tags: ["lake", "reflection", "peaceful", "nature"]
    },
    {
        id: 7,
        url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "landscapes",
        title: "Desert Sunset",
        description: "Magical sunset over golden sand dunes",
        tags: ["desert", "sunset", "dunes", "golden"]
    },
    {
        id: 8,
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "culture",
        title: "Local Festival",
        description: "Vibrant cultural celebration",
        tags: ["festival", "culture", "celebration", "traditional"]
    }
];

let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [];

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
    }
}

// Load and display gallery images
function loadGallery(filter = 'all') {
    const container = document.getElementById('gallery-container');
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('empty-state');
    
    if (!container) return;

    // Show loading
    if (loading) loading.style.display = 'block';
    container.innerHTML = '';
    if (emptyState) emptyState.classList.add('hidden');

    // Filter images
    filteredImages = filter === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === filter);

    // Simulate loading delay
    setTimeout(() => {
        if (loading) loading.style.display = 'none';
        
        if (filteredImages.length === 0) {
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        filteredImages.forEach((image, index) => {
            const imageElement = createImageElement(image, index);
            container.appendChild(imageElement);
        });
    }, 300);
}

// Create image element
function createImageElement(image, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item mb-4 md:mb-6 break-inside-avoid cursor-pointer';
    
    div.innerHTML = `
        <div class="relative group overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300">
            <img 
                src="${image.url}" 
                alt="${image.title}"
                class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 class="font-bold text-lg mb-1">${image.title}</h3>
                    <p class="text-sm text-gray-200">${image.description}</p>
                    <div class="flex flex-wrap gap-1 mt-2">
                        ${image.tags.map(tag => `<span class="bg-white/20 text-xs px-2 py-1 rounded-full">#${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button class="bg-white/90 text-gray-800 p-2 rounded-full shadow-lg hover:bg-white transition">
                    <i class="fas fa-expand-alt"></i>
                </button>
            </div>
        </div>
    `;

    // Add click event to open modal
    div.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(index);
    });
    
    return div;
}

// Modal functionality
function openModal(imageIndex) {
    currentImageIndex = imageIndex;
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const imageTitle = document.getElementById('imageTitle');
    const imageDescription = document.getElementById('imageDescription');
    const imageTags = document.getElementById('imageTags');
    
    if (!modal || !modalImage) return;
    
    const image = filteredImages[imageIndex];
    
    modalImage.src = image.url;
    modalImage.alt = image.title;
    if (imageTitle) imageTitle.textContent = image.title;
    if (imageDescription) imageDescription.textContent = image.description;
    if (imageTags) {
        imageTags.innerHTML = image.tags.map(tag => 
            `<span class="bg-white/20 text-sm px-3 py-1 rounded-full mr-2">#${tag}</span>`
        ).join('');
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Update navigation buttons
    updateNavigationButtons();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

function showPreviousImage() {
    if (currentImageIndex > 0) {
        openModal(currentImageIndex - 1);
    }
}

function showNextImage() {
    if (currentImageIndex < filteredImages.length - 1) {
        openModal(currentImageIndex + 1);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    
    if (prevBtn) prevBtn.style.display = currentImageIndex > 0 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = currentImageIndex < filteredImages.length - 1 ? 'flex' : 'none';
}

// Filter functionality
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gradient-to-r', 'from-purple-600', 'to-blue-600', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700', 'border-2', 'border-gray-200');
            });
            
            // Add active class to clicked button
            button.classList.add('active', 'bg-gradient-to-r', 'from-purple-600', 'to-blue-600', 'text-white');
            button.classList.remove('bg-white', 'text-gray-700', 'border-2', 'border-gray-200');
            
            // Load gallery with filter
            currentFilter = button.dataset.filter;
            loadGallery(currentFilter);
        });
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('imageModal');
        if (modal && !modal.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}

// Touch/swipe support for mobile
function initTouchSupport() {
    let startX = 0;
    let startY = 0;
    
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    modal.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    modal.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next image
                showNextImage();
            } else {
                // Swipe right - previous image
                showPreviousImage();
            }
        }
        
        startX = 0;
        startY = 0;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    loadGallery();
    initFilters();
    initKeyboardNavigation();
    initTouchSupport();
    
    // Modal event listeners
    const closeModalBtn = document.getElementById('closeModal');
    const prevImageBtn = document.getElementById('prevImage');
    const nextImageBtn = document.getElementById('nextImage');
    const modal = document.getElementById('imageModal');
    
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (prevImageBtn) prevImageBtn.addEventListener('click', showPreviousImage);
    if (nextImageBtn) nextImageBtn.addEventListener('click', showNextImage);
    
    // Close modal when clicking backdrop
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Export for use in other files
window.GalleryModule = {
    images: galleryImages,
    loadGallery,
    openModal,
    closeModal
};
