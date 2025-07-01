
// Admin Gallery Management JavaScript

// Sample gallery data (replace with Firebase)
let galleryImages = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "landscapes",
        caption: "Beautiful mountain landscape",
        tags: ["mountains", "nature", "scenic"],
        uploadDate: "2024-01-15"
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "adventures",
        caption: "Water sports adventure",
        tags: ["water", "sports", "adventure"],
        uploadDate: "2024-01-16"
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1539650116574-75c0c6d24edc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "culture",
        caption: "Historic architecture",
        tags: ["history", "architecture", "culture"],
        uploadDate: "2024-01-17"
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "wildlife",
        caption: "Wildlife photography",
        tags: ["wildlife", "animals", "nature"],
        uploadDate: "2024-01-18"
    },
    {
        id: 5,
        url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "people",
        caption: "Happy travelers",
        tags: ["people", "travel", "happiness"],
        uploadDate: "2024-01-19"
    }
];

let currentEditingImage = null;
let imageIdCounter = galleryImages.length + 1;
let currentFilter = 'all';

// Load gallery images
function loadGallery(filter = 'all') {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    const filteredImages = filter === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === filter);

    grid.innerHTML = '';

    filteredImages.forEach(image => {
        const imageElement = `
            <div class="relative group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
                <img src="${image.url}" alt="${image.caption}" class="w-full h-48 object-cover">
                
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div class="flex space-x-2">
                        <button onclick="editImage(${image.id})" class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteImage(${image.id})" class="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button onclick="viewImage('${image.url}')" class="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>

                <div class="p-3">
                    <div class="flex justify-between items-start mb-2">
                        <span class="px-2 py-1 bg-${getCategoryColor(image.category)}-100 text-${getCategoryColor(image.category)}-800 text-xs font-semibold rounded-full">
                            ${image.category}
                        </span>
                        <span class="text-xs text-gray-500">${formatDate(image.uploadDate)}</span>
                    </div>
                    
                    ${image.caption ? `<p class="text-sm text-gray-700 mb-2">${image.caption}</p>` : ''}
                    
                    ${image.tags && image.tags.length > 0 ? `
                        <div class="flex flex-wrap gap-1">
                            ${image.tags.map(tag => `<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">#${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        grid.innerHTML += imageElement;
    });

    if (filteredImages.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-images text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-500 mb-2">No images found</h3>
                <p class="text-gray-400">Try uploading some images or changing the filter</p>
            </div>
        `;
    }
}

// Get category color
function getCategoryColor(category) {
    const colors = {
        landscapes: 'green',
        adventures: 'orange',
        culture: 'purple',
        wildlife: 'yellow',
        people: 'red'
    };
    return colors[category] || 'blue';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

// Update stats
function updateStats() {
    const stats = {
        total: galleryImages.length,
        landscapes: galleryImages.filter(img => img.category === 'landscapes').length,
        adventures: galleryImages.filter(img => img.category === 'adventures').length,
        culture: galleryImages.filter(img => img.category === 'culture').length,
        wildlife: galleryImages.filter(img => img.category === 'wildlife').length,
        people: galleryImages.filter(img => img.category === 'people').length
    };

    document.getElementById('totalImages').textContent = stats.total;
    document.getElementById('landscapeCount').textContent = stats.landscapes;
    document.getElementById('adventureCount').textContent = stats.adventures;
    document.getElementById('cultureCount').textContent = stats.culture;
    document.getElementById('wildlifeCount').textContent = stats.wildlife;
    document.getElementById('peopleCount').textContent = stats.people;
}

// Open upload modal
function openUploadModal() {
    document.getElementById('uploadForm').reset();
    document.getElementById('imagePreview').classList.add('hidden');
    document.getElementById('uploadModal').classList.remove('hidden');
    document.getElementById('uploadModal').classList.add('flex');
}

// Edit image
function editImage(imageId) {
    const image = galleryImages.find(img => img.id === imageId);
    if (!image) return;

    currentEditingImage = image;
    
    document.getElementById('editPreviewImg').src = image.url;
    document.getElementById('editImageCategory').value = image.category;
    document.getElementById('editImageCaption').value = image.caption || '';
    document.getElementById('editImageTags').value = image.tags ? image.tags.join(', ') : '';

    document.getElementById('editModal').classList.remove('hidden');
    document.getElementById('editModal').classList.add('flex');
}

// Delete image
function deleteImage(imageId) {
    if (confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
        galleryImages = galleryImages.filter(img => img.id !== imageId);
        loadGallery(currentFilter);
        updateStats();
        showNotification('Image deleted successfully!', 'success');
    }
}

// View image in full screen
function viewImage(imageUrl) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="relative max-w-full max-h-full">
            <img src="${imageUrl}" alt="Full size image" class="max-w-full max-h-full object-contain">
            <button onclick="this.parentElement.parentElement.remove()" class="absolute top-4 right-4 text-white text-3xl hover:text-gray-300">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Close modals
function closeUploadModal() {
    document.getElementById('uploadModal').classList.add('hidden');
    document.getElementById('uploadModal').classList.remove('flex');
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
    document.getElementById('editModal').classList.remove('flex');
}

// Handle upload form
function handleUploadForm(e) {
    e.preventDefault();

    const formData = {
        url: document.getElementById('imageUrl').value,
        category: document.getElementById('imageCategory').value,
        caption: document.getElementById('imageCaption').value,
        tags: document.getElementById('imageTags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
        uploadDate: new Date().toISOString().split('T')[0]
    };

    const newImage = {
        id: imageIdCounter++,
        ...formData
    };

    galleryImages.push(newImage);
    closeUploadModal();
    loadGallery(currentFilter);
    updateStats();
    showNotification('Image uploaded successfully!', 'success');
}

// Handle edit form
function handleEditForm(e) {
    e.preventDefault();

    if (!currentEditingImage) return;

    const updatedData = {
        category: document.getElementById('editImageCategory').value,
        caption: document.getElementById('editImageCaption').value,
        tags: document.getElementById('editImageTags').value.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    const index = galleryImages.findIndex(img => img.id === currentEditingImage.id);
    galleryImages[index] = { ...currentEditingImage, ...updatedData };

    closeEditModal();
    loadGallery(currentFilter);
    updateStats();
    showNotification('Image updated successfully!', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }

    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            ${message}
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Preview image URL
function previewImage() {
    const url = document.getElementById('imageUrl').value;
    if (url) {
        document.getElementById('previewImg').src = url;
        document.getElementById('imagePreview').classList.remove('hidden');
    } else {
        document.getElementById('imagePreview').classList.add('hidden');
    }
}

// Logout functionality
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminAuth');
        sessionStorage.removeItem('adminAuth');
        window.location.href = 'login.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
    if (!isAuthenticated) {
        window.location.href = 'login.html';
        return;
    }

    // Load gallery and stats
    loadGallery();
    updateStats();

    // Setup event listeners
    document.getElementById('uploadBtn').addEventListener('click', openUploadModal);
    document.getElementById('closeUploadModal').addEventListener('click', closeUploadModal);
    document.getElementById('cancelUpload').addEventListener('click', closeUploadModal);
    document.getElementById('uploadForm').addEventListener('submit', handleUploadForm);
    
    document.getElementById('closeEditModal').addEventListener('click', closeEditModal);
    document.getElementById('cancelEdit').addEventListener('click', closeEditModal);
    document.getElementById('editForm').addEventListener('submit', handleEditForm);
    
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    document.getElementById('imageUrl').addEventListener('input', previewImage);

    // Setup category filters
    document.querySelectorAll('.category-filter').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.category-filter').forEach(btn => {
                btn.classList.remove('active', 'bg-blue-600', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700', 'border');
            });

            // Add active class to clicked button
            this.classList.add('active', 'bg-blue-600', 'text-white');
            this.classList.remove('bg-white', 'text-gray-700', 'border');

            // Load gallery with filter
            currentFilter = this.dataset.category;
            loadGallery(currentFilter);
        });
    });

    // Close modals on outside click
    document.getElementById('uploadModal').addEventListener('click', function(e) {
        if (e.target === this) closeUploadModal();
    });

    document.getElementById('editModal').addEventListener('click', function(e) {
        if (e.target === this) closeEditModal();
    });
});

// Make functions global
window.editImage = editImage;
window.deleteImage = deleteImage;
window.viewImage = viewImage;
