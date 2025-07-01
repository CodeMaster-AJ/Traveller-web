
const express = require('express');
const router = express.Router();

// In-memory storage for demo (replace with Firebase in production)
let bookings = [];
let bookingIdCounter = 1;

// POST /api/bookings - Create new booking
router.post('/', (req, res) => {
    try {
        const {
            tripId,
            tripDate,
            userName,
            userEmail,
            userPhone,
            travelers,
            specialRequirements
        } = req.body;

        // Validation
        if (!tripId || !tripDate || !userName || !userEmail || !userPhone) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Create booking
        const newBooking = {
            id: bookingIdCounter++,
            tripId: parseInt(tripId),
            tripDate,
            userName,
            userEmail,
            userPhone,
            travelers: travelers || '1',
            specialRequirements: specialRequirements || '',
            status: 'pending',
            bookingDate: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };

        bookings.push(newBooking);

        res.status(201).json({
            success: true,
            data: newBooking,
            message: 'Booking request submitted successfully'
        });

    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create booking'
        });
    }
});

// GET /api/bookings - Get all bookings (admin only)
router.get('/', (req, res) => {
    try {
        const { status, email } = req.query;
        let filteredBookings = [...bookings];

        if (status) {
            filteredBookings = filteredBookings.filter(booking => booking.status === status);
        }

        if (email) {
            filteredBookings = filteredBookings.filter(booking => 
                booking.userEmail.toLowerCase().includes(email.toLowerCase())
            );
        }

        // Sort by booking date (newest first)
        filteredBookings.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));

        res.json({
            success: true,
            data: filteredBookings,
            count: filteredBookings.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch bookings'
        });
    }
});

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', (req, res) => {
    try {
        const bookingId = parseInt(req.params.id);
        const booking = bookings.find(b => b.id === bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch booking'
        });
    }
});

// PUT /api/bookings/:id - Update booking status
router.put('/:id', (req, res) => {
    try {
        const bookingId = parseInt(req.params.id);
        const { status } = req.body;

        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        
        if (bookingIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status'
            });
        }

        bookings[bookingIndex].status = status;
        bookings[bookingIndex].updatedAt = new Date().toISOString();

        res.json({
            success: true,
            data: bookings[bookingIndex],
            message: 'Booking updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update booking'
        });
    }
});

// DELETE /api/bookings/:id - Delete booking
router.delete('/:id', (req, res) => {
    try {
        const bookingId = parseInt(req.params.id);
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);

        if (bookingIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }

        const deletedBooking = bookings.splice(bookingIndex, 1)[0];

        res.json({
            success: true,
            data: deletedBooking,
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete booking'
        });
    }
});

module.exports = router;
