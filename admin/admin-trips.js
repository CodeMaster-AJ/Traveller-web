
// Admin Trips Management JavaScript

// Sample trips data (replace with Firebase)
let trips = [
    {
        id: 1,
        title: "Hanuwantiya Island Adventure",
        description: "Experience the beauty of Hanuwantiya Island with water sports and island camping. Enjoy jet skiing, parasailing, and bonfire nights under the stars.",
        price: "₹3,500",
        originalPrice: "₹4,000",
        duration: "2 Days / 1 Night",
        category: "adventure",
        difficulty: "moderate",
        groupSize: "8-15 people",
        includes: ["Accommodation", "All meals", "Water sports", "Guide", "Transport"],
        excludes: ["Personal expenses", "Insurance", "Tips"],
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        availableDates: ["2024-02-15", "2024-02-22", "2024-03-01", "2024-03-08"],
        highlights: ["Water sports activities", "Island camping", "Sunset boat ride", "Local cuisine"],
        itinerary: [
            "Day 1: Arrival, water sports, island exploration",
            "Day 2: Sunrise view, breakfast, departure"
        ]
    },
    {
        id: 2,
        title: "Mandu Heritage Trek",
        description: "Explore the historical ruins and monuments of Mandu with guided cultural tours. Walk through ancient palaces and learn about the rich Malwa history.",
        price: "₹2,800",
        originalPrice: "₹3,200",
        duration: "3 Days / 2 Nights",
        category: "cultural",
        difficulty: "easy",
        groupSize: "10-20 people",
        includes: ["Accommodation", "All meals", "Guide", "Entry fees", "Transport"],
        excludes: ["Personal expenses", "Shopping", "Tips"],
        imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d24edc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        availableDates: ["2024-02-20", "2024-02-27", "2024-03-05", "2024-03-12"],
        highlights: ["Jahaz Mahal", "Hindola Mahal", "Rani Roopmati Pavilion", "Baz Bahadur Palace"],
        itinerary: [
            "Day 1: Arrival, Jahaz Mahal, local sightseeing",
            "Day 2: Heritage monuments tour, cultural evening",
            "Day 3: Sunrise at Roopmati Pavilion, departure"
        ]
    }
];

let currentEditingTrip = null;
let tripIdCounter = trips.length + 1;

// Load trips into grid
function loadTrips() {
    const grid = document.getElementById('tripsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    trips.forEach(trip => {
        const tripCard = `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300">
                <div class="relative">
                    <img src="${trip.imageUrl}" alt="${trip.title}" class="w-full h-48 object-cover">
                    <div class="absolute top-2 right-2">
                        <span class="px-2 py-1 bg-${getCategoryColor(trip.category)}-100 text-${getCategoryColor(trip.category)}-800 text-xs font-semibold rounded-full">
                            ${trip.category}
                        </span>
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">${trip.title}</h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">${trip.description}</p>
                    
                    <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center space-x-2">
                            <span class="text-2xl font-bold text-blue-600">${trip.price}</span>
                            ${trip.originalPrice ? `<span class="text-sm text-gray-500 line-through">${trip.originalPrice}</span>` : ''}
                        </div>
                        <span class="text-sm text-gray-500">${trip.duration}</span>
                    </div>

                    <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div class="flex items-center">
                            <i class="fas fa-users mr-1"></i>
                            ${trip.groupSize}
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-signal mr-1"></i>
                            ${trip.difficulty}
                        </div>
                    </div>

                    <div class="flex space-x-2">
                        <button onclick="editTrip(${trip.id})" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                            <i class="fas fa-edit mr-1"></i>
                            Edit
                        </button>
                        <button onclick="deleteTrip(${trip.id})" class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition">
                            <i class="fas fa-trash mr-1"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += tripCard;
    });
}

// Get category color
function getCategoryColor(category) {
    const colors = {
        adventure: 'orange',
        nature: 'green',
        cultural: 'purple',
        spiritual: 'indigo',
        wildlife: 'yellow'
    };
    return colors[category] || 'blue';
}

// Open add trip modal
function openAddTripModal() {
    currentEditingTrip = null;
    document.getElementById('modalTitle').textContent = 'Add New Trip';
    document.getElementById('tripForm').reset();
    document.getElementById('tripModal').classList.remove('hidden');
    document.getElementById('tripModal').classList.add('flex');
}

// Edit trip
function editTrip(tripId) {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;

    currentEditingTrip = trip;
    document.getElementById('modalTitle').textContent = 'Edit Trip';
    
    // Populate form
    document.getElementById('tripTitle').value = trip.title;
    document.getElementById('tripCategory').value = trip.category;
    document.getElementById('tripDifficulty').value = trip.difficulty;
    document.getElementById('tripDuration').value = trip.duration;
    document.getElementById('tripGroupSize').value = trip.groupSize;
    document.getElementById('tripPrice').value = trip.price;
    document.getElementById('tripOriginalPrice').value = trip.originalPrice || '';
    document.getElementById('tripImageUrl').value = trip.imageUrl;
    document.getElementById('tripDates').value = trip.availableDates.join(', ');
    document.getElementById('tripDescription').value = trip.description;
    document.getElementById('tripIncludes').value = trip.includes.join('\n');
    document.getElementById('tripExcludes').value = trip.excludes.join('\n');
    document.getElementById('tripHighlights').value = trip.highlights.join('\n');
    document.getElementById('tripItinerary').value = trip.itinerary.join('\n');

    document.getElementById('tripModal').classList.remove('hidden');
    document.getElementById('tripModal').classList.add('flex');
}

// Delete trip
function deleteTrip(tripId) {
    if (confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
        trips = trips.filter(t => t.id !== tripId);
        loadTrips();
        showNotification('Trip deleted successfully!', 'success');
    }
}

// Close modal
function closeModal() {
    document.getElementById('tripModal').classList.add('hidden');
    document.getElementById('tripModal').classList.remove('flex');
}

// Handle form submission
function handleTripFormSubmit(e) {
    e.preventDefault();

    const formData = {
        title: document.getElementById('tripTitle').value,
        category: document.getElementById('tripCategory').value,
        difficulty: document.getElementById('tripDifficulty').value,
        duration: document.getElementById('tripDuration').value,
        groupSize: document.getElementById('tripGroupSize').value,
        price: document.getElementById('tripPrice').value,
        originalPrice: document.getElementById('tripOriginalPrice').value,
        imageUrl: document.getElementById('tripImageUrl').value,
        availableDates: document.getElementById('tripDates').value.split(',').map(d => d.trim()).filter(d => d),
        description: document.getElementById('tripDescription').value,
        includes: document.getElementById('tripIncludes').value.split('\n').filter(i => i.trim()),
        excludes: document.getElementById('tripExcludes').value.split('\n').filter(e => e.trim()),
        highlights: document.getElementById('tripHighlights').value.split('\n').filter(h => h.trim()),
        itinerary: document.getElementById('tripItinerary').value.split('\n').filter(i => i.trim())
    };

    if (currentEditingTrip) {
        // Update existing trip
        const index = trips.findIndex(t => t.id === currentEditingTrip.id);
        trips[index] = { ...currentEditingTrip, ...formData };
        showNotification('Trip updated successfully!', 'success');
    } else {
        // Add new trip
        const newTrip = {
            id: tripIdCounter++,
            ...formData
        };
        trips.push(newTrip);
        showNotification('Trip added successfully!', 'success');
    }

    closeModal();
    loadTrips();
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

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
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

    // Load trips
    loadTrips();

    // Setup event listeners
    document.getElementById('addTripBtn').addEventListener('click', openAddTripModal);
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    document.getElementById('tripForm').addEventListener('submit', handleTripFormSubmit);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Close modal on outside click
    document.getElementById('tripModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
});

// Make functions global
window.editTrip = editTrip;
window.deleteTrip = deleteTrip;
