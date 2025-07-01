
// Get trips data
const trips = window.BanjaraJourneys?.trips || [];

// Load trip options in select dropdown
function loadTripOptions() {
    const tripSelect = document.getElementById('tripSelect');
    if (!tripSelect) return;

    tripSelect.innerHTML = '<option value="">Choose your adventure...</option>';
    
    trips.forEach(trip => {
        const option = document.createElement('option');
        option.value = trip.id;
        option.textContent = `${trip.title} - ${trip.price}`;
        tripSelect.appendChild(option);
    });
    
    // Check if trip ID is in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tripId = urlParams.get('trip');
    if (tripId) {
        tripSelect.value = tripId;
        showTripDetails(tripId);
    }
}

// Show trip details when trip is selected
function showTripDetails(tripId) {
    const trip = trips.find(t => t.id == tripId);
    if (!trip) return;

    const tripDetails = document.getElementById('tripDetails');
    const tripInfo = document.getElementById('tripInfo');
    
    if (tripDetails && tripInfo) {
        tripInfo.innerHTML = `
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <img src="${trip.imageUrl}" alt="${trip.title}" class="w-full h-48 object-cover rounded-lg">
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-2">${trip.title}</h4>
                    <p class="text-gray-600 mb-2">${trip.description}</p>
                    <div class="space-y-2">
                        <p><strong>Price:</strong> ${trip.price} per person</p>
                        <p><strong>Duration:</strong> ${trip.duration}</p>
                        <p><strong>Category:</strong> <span class="capitalize">${trip.category}</span></p>
                    </div>
                    <div class="mt-3">
                        <p class="text-sm font-medium mb-1">Available Dates:</p>
                        <div class="flex flex-wrap gap-1">
                            ${trip.availableDates.map(date => 
                                `<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${new Date(date).toLocaleDateString()}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        tripDetails.classList.remove('hidden');
    }
}

// Handle trip selection change
function initTripSelection() {
    const tripSelect = document.getElementById('tripSelect');
    if (tripSelect) {
        tripSelect.addEventListener('change', function() {
            const tripId = this.value;
            if (tripId) {
                showTripDetails(tripId);
            } else {
                const tripDetails = document.getElementById('tripDetails');
                if (tripDetails) {
                    tripDetails.classList.add('hidden');
                }
            }
        });
    }
}

// Handle form submission
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            tripId: document.getElementById('tripSelect').value,
            tripDate: document.getElementById('tripDate').value,
            userName: document.getElementById('userName').value,
            userEmail: document.getElementById('userEmail').value,
            userPhone: document.getElementById('userPhone').value,
            travelers: document.getElementById('travelers').value,
            specialRequirements: document.getElementById('specialRequirements').value,
            status: 'pending',
            bookingDate: new Date().toISOString()
        };

        // Validate required fields
        if (!formData.tripId || !formData.tripDate || !formData.userName || 
            !formData.userEmail || !formData.userPhone) {
            alert('Please fill in all required fields.');
            return;
        }

        // Here you would normally send to Firebase
        console.log('Booking submitted:', formData);
        
        // Show success message
        alert(`Thank you, ${formData.userName}! Your booking request has been submitted. We'll contact you soon at ${formData.userEmail} to confirm your adventure!`);
        
        // Reset form
        form.reset();
        document.getElementById('tripDetails').classList.add('hidden');
    });
}

// Set minimum date to today
function setMinDate() {
    const dateInput = document.getElementById('tripDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadTripOptions();
    initTripSelection();
    initBookingForm();
    setMinDate();
});
