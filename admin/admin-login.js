// Admin Login JavaScript

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    const icon = toggleBtn.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Simple validation for demo (replace with Firebase Auth)
    if (email === 'admin@banjarajourneys.com' && password === 'admin123') {
        // Store auth state
        const authData = {
            email: email,
            timestamp: new Date().toISOString(),
            isAdmin: true
        };

        if (rememberMe) {
            localStorage.setItem('adminAuth', JSON.stringify(authData));
        } else {
            sessionStorage.setItem('adminAuth', JSON.stringify(authData));
        }

        // Show success message
        showNotification('Login successful! Redirecting...', 'success');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
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
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
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

// Initialize login page
document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    const isAuthenticated = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
    if (isAuthenticated) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Setup event listeners
    document.getElementById('togglePassword').addEventListener('click', togglePassword);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
});