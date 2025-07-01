
// Admin Bookings Management JavaScript

// Sample bookings data (replace with Firebase)
let bookings = [
    {
        id: 1,
        tripId: 1,
        tripTitle: "Hanuwantiya Island Adventure",
        tripDate: "2024-02-15",
        userName: "Rahul Sharma",
        userEmail: "rahul.sharma@example.com",
        userPhone: "+91 9876543210",
        travelers: "2",
        specialRequirements: "Vegetarian meals for both travelers",
        status: "pending",
        bookingDate: "2024-01-20T10:30:00Z",
        createdAt: "2024-01-20T10:30:00Z"
    },
    {
        id: 2,
        tripId: 2,
        tripTitle: "Mandu Heritage Trek",
        tripDate: "2024-02-20",
        userName: "Priya Patel",
        userEmail: "priya.patel@example.com",
        userPhone: "+91 9876543211",
        travelers: "4",
        specialRequirements: "One senior citizen in the group",
        status: "confirmed",
        bookingDate: "2024-01-18T14:15:00Z",
        createdAt: "2024-01-18T14:15:00Z"
    },
    {
        id: 3,
        tripId: 3,
        tripTitle: "Pachmarhi Hill Station Retreat",
        tripDate: "2024-02-25",
        userName: "Amit Kumar",
        userEmail: "amit.kumar@example.com",
        userPhone: "+91 9876543212",
        travelers: "1",
        specialRequirements: "",
        status: "cancelled",
        bookingDate: "2024-01-15T09:20:00Z",
        createdAt: "2024-01-15T09:20:00Z"
    }
];

let currentBooking = null;
let filteredBookings = [...bookings];

// Load bookings
function loadBookings() {
    const tableBody = document.getElementById('bookingsTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (!tableBody) return;

    if (filteredBookings.length === 0) {
        tableBody.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    
    tableBody.innerHTML = '';
    
    filteredBookings.forEach(booking => {
        const row = `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <i class="fas fa-user text-blue-600"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${booking.userName}</div>
                            <div class="text-sm text-gray-500">${booking.userEmail}</div>
                            <div class="text-sm text-gray-500">${booking.userPhone}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${booking.tripTitle}</div>
                    <div class="text-sm text-gray-500">Trip Date: ${formatDate(booking.tripDate)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${formatDate(booking.tripDate)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div class="flex items-center">
                        <i class="fas fa-users mr-1 text-gray-400"></i>
                        ${booking.travelers}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}">
                        ${booking.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${formatDateTime(booking.bookingDate)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                        <button onclick="viewBooking(${booking.id})" class="text-blue-600 hover:text-blue-900">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="updateBookingStatus(${booking.id}, 'confirmed')" class="text-green-600 hover:text-green-900" ${booking.status === 'confirmed' ? 'disabled' : ''}>
                            <i class="fas fa-check"></i>
                        </button>
                        <button onclick="updateBookingStatus(${booking.id}, 'cancelled')" class="text-red-600 hover:text-red-900" ${booking.status === 'cancelled' ? 'disabled' : ''}>
                            <i class="fas fa-times"></i>
                        </button>
                        <button onclick="deleteBooking(${booking.id})" class="text-red-600 hover:text-red-900">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Get status color
function getStatusColor(status) {
    switch (status) {
        case 'confirmed':
            return 'bg-green-100 text-green-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'short', 
        day: 'numeric'
    });
}

// Format date and time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Update booking statistics
function updateStats() {
    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length
    };

    document.getElementById('totalBookings').textContent = stats.total;
    document.getElementById('pendingBookings').textContent = stats.pending;
    document.getElementById('confirmedBookings').textContent = stats.confirmed;
    document.getElementById('cancelledBookings').textContent = stats.cancelled;
}

// View booking details
function viewBooking(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    currentBooking = booking;
    
    const detailsContainer = document.getElementById('bookingDetails');
    detailsContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-4">Customer Information</h4>
                <div class="space-y-3">
                    <div>
                        <label class="text-sm font-medium text-gray-700">Name</label>
                        <p class="text-sm text-gray-900">${booking.userName}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Email</label>
                        <p class="text-sm text-gray-900">${booking.userEmail}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Phone</label>
                        <p class="text-sm text-gray-900">${booking.userPhone}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Number of Travelers</label>
                        <p class="text-sm text-gray-900">${booking.travelers}</p>
                    </div>
                </div>
            </div>
            
            <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-4">Trip Information</h4>
                <div class="space-y-3">
                    <div>
                        <label class="text-sm font-medium text-gray-700">Trip</label>
                        <p class="text-sm text-gray-900">${booking.tripTitle}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Trip Date</label>
                        <p class="text-sm text-gray-900">${formatDate(booking.tripDate)}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Status</label>
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}">
                            ${booking.status}
                        </span>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Booking Date</label>
                        <p class="text-sm text-gray-900">${formatDateTime(booking.bookingDate)}</p>
                    </div>
                </div>
            </div>
        </div>
        
        ${booking.specialRequirements ? `
            <div class="mt-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">Special Requirements</h4>
                <p class="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">${booking.specialRequirements}</p>
            </div>
        ` : ''}
    `;

    // Update button states
    const confirmBtn = document.getElementById('confirmBookingBtn');
    const cancelBtn = document.getElementById('cancelBookingBtn');
    
    confirmBtn.style.display = booking.status === 'confirmed' ? 'none' : 'block';
    cancelBtn.style.display = booking.status === 'cancelled' ? 'none' : 'block';

    document.getElementById('bookingModal').classList.remove('hidden');
    document.getElementById('bookingModal').classList.add('flex');
}

// Update booking status
function updateBookingStatus(bookingId, newStatus) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    if (confirm(`Are you sure you want to ${newStatus} this booking?`)) {
        booking.status = newStatus;
        booking.updatedAt = new Date().toISOString();
        
        loadBookings();
        updateStats();
        showNotification(`Booking ${newStatus} successfully!`, 'success');
    }
}

// Delete booking
function deleteBooking(bookingId) {
    if (confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
        bookings = bookings.filter(b => b.id !== bookingId);
        applyFilters();
        updateStats();
        showNotification('Booking deleted successfully!', 'success');
    }
}

// Close booking modal
function closeBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
    document.getElementById('bookingModal').classList.remove('flex');
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('searchBookings').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    filteredBookings = bookings.filter(booking => {
        const matchesSearch = !searchTerm || 
            booking.userName.toLowerCase().includes(searchTerm) ||
            booking.userEmail.toLowerCase().includes(searchTerm) ||
            booking.tripTitle.toLowerCase().includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    loadBookings();
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

    // Load initial data
    applyFilters();
    updateStats();

    // Setup event listeners
    document.getElementById('searchBookings').addEventListener('input', applyFilters);
    document.getElementById('statusFilter').addEventListener('change', applyFilters);
    document.getElementById('closeBookingModal').addEventListener('click', closeBookingModal);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Booking modal actions
    document.getElementById('confirmBookingBtn').addEventListener('click', function() {
        if (currentBooking) {
            updateBookingStatus(currentBooking.id, 'confirmed');
            closeBookingModal();
        }
    });
    
    document.getElementById('cancelBookingBtn').addEventListener('click', function() {
        if (currentBooking) {
            updateBookingStatus(currentBooking.id, 'cancelled');
            closeBookingModal();
        }
    });

    // Close modal on outside click
    document.getElementById('bookingModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeBookingModal();
        }
    });
});

// Make functions global
window.viewBooking = viewBooking;
window.updateBookingStatus = updateBookingStatus;
window.deleteBooking = deleteBooking;
