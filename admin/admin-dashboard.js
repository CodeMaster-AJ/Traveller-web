
// Admin Dashboard JavaScript

// Dashboard stats
let dashboardStats = {
    totalTrips: 4,
    totalBookings: 48,
    pendingBookings: 8,
    newMessages: 15
};

// Mobile sidebar functionality
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-mobile');
            if (overlay) overlay.classList.remove('hidden');
        });

        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.add('sidebar-mobile');
                overlay.classList.add('hidden');
            });
        }
    }
}

// Load dashboard data
async function loadDashboardStats() {
    try {
        // In a real app, this would fetch from Firebase
        // For now, we'll use sample data
        updateStatsDisplay();
        loadRecentActivity();
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// Update stats display
function updateStatsDisplay() {
    const totalTripsEl = document.getElementById('totalTrips');
    const totalBookingsEl = document.getElementById('totalBookings');
    const pendingBookingsEl = document.getElementById('pendingBookings');
    const newMessagesEl = document.getElementById('newMessages');

    if (totalTripsEl) totalTripsEl.textContent = dashboardStats.totalTrips;
    if (totalBookingsEl) totalBookingsEl.textContent = dashboardStats.totalBookings;
    if (pendingBookingsEl) pendingBookingsEl.textContent = dashboardStats.pendingBookings;
    if (newMessagesEl) newMessagesEl.textContent = dashboardStats.newMessages;
}

// Load recent activity
function loadRecentActivity() {
    loadRecentBookings();
    loadRecentContacts();
}

// Load recent bookings
function loadRecentBookings() {
    const container = document.getElementById('recentBookings');
    if (!container) return;

    const bookings = [
        {
            name: 'Raj Patel',
            trip: 'Himalayan Expedition',
            amount: '₹25,999',
            status: 'Confirmed',
            time: '2 hrs ago',
            statusColor: 'green'
        },
        {
            name: 'Priya Sharma',
            trip: 'Kerala Backwaters',
            amount: '₹22,999',
            status: 'Pending',
            time: '5 hrs ago',
            statusColor: 'yellow'
        }
    ];

    container.innerHTML = bookings.map(booking => `
        <div class="flex items-center p-4 bg-gradient-to-r from-${booking.statusColor}-50 to-blue-50 rounded-xl">
            <div class="w-12 h-12 bg-gradient-to-r from-${booking.statusColor}-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
                <i class="fas fa-user text-white"></i>
            </div>
            <div class="flex-1">
                <p class="font-semibold text-gray-800">${booking.name}</p>
                <p class="text-sm text-gray-600">${booking.trip} - ${booking.amount}</p>
                <p class="text-xs text-${booking.statusColor}-600 font-medium">${booking.status}</p>
            </div>
            <div class="text-right">
                <p class="text-sm text-gray-500">${booking.time}</p>
            </div>
        </div>
    `).join('');
}

// Load recent contacts
function loadRecentContacts() {
    const container = document.getElementById('recentContacts');
    if (!container) return;

    const contacts = [
        {
            name: 'Ankit Kumar',
            message: 'Inquiry about group booking for Rajasthan tour...',
            time: '1 hr ago',
            color: 'purple'
        },
        {
            name: 'Sneha Gupta',
            message: 'Question about travel insurance coverage...',
            time: '3 hrs ago',
            color: 'blue'
        }
    ];

    container.innerHTML = contacts.map(contact => `
        <div class="flex items-start p-4 bg-gradient-to-r from-${contact.color}-50 to-pink-50 rounded-xl">
            <div class="w-12 h-12 bg-gradient-to-r from-${contact.color}-600 to-pink-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <i class="fas fa-envelope text-white"></i>
            </div>
            <div class="flex-1 min-w-0">
                <p class="font-semibold text-gray-800">${contact.name}</p>
                <p class="text-sm text-gray-600 truncate">${contact.message}</p>
                <p class="text-xs text-${contact.color}-600 font-medium">${contact.time}</p>
            </div>
        </div>
    `).join('');
}

// Logout functionality
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminAuth');
        sessionStorage.removeItem('adminAuth');
        window.location.href = 'login.html';
    }
}

// Check authentication
function checkAuth() {
    const isAuthenticated = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
    if (!isAuthenticated) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!checkAuth()) return;

    // Initialize components
    initSidebar();
    loadDashboardStats();

    // Setup event listeners
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});
