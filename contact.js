
const express = require('express');
const router = express.Router();

// In-memory storage for demo (replace with Firebase in production)
let contacts = [];
let contactIdCounter = 1;

// POST /api/contact - Submit contact form
router.post('/', (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            subject,
            message
        } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Create contact entry
        const newContact = {
            id: contactIdCounter++,
            firstName,
            lastName,
            email,
            phone: phone || '',
            subject,
            message,
            status: 'new',
            createdAt: new Date().toISOString()
        };

        contacts.push(newContact);

        res.status(201).json({
            success: true,
            data: newContact,
            message: 'Contact form submitted successfully'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit contact form'
        });
    }
});

// GET /api/contact - Get all contact submissions (admin only)
router.get('/', (req, res) => {
    try {
        const { status, subject } = req.query;
        let filteredContacts = [...contacts];

        if (status) {
            filteredContacts = filteredContacts.filter(contact => contact.status === status);
        }

        if (subject) {
            filteredContacts = filteredContacts.filter(contact => contact.subject === subject);
        }

        // Sort by creation date (newest first)
        filteredContacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({
            success: true,
            data: filteredContacts,
            count: filteredContacts.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch contact submissions'
        });
    }
});

// GET /api/contact/:id - Get contact by ID
router.get('/:id', (req, res) => {
    try {
        const contactId = parseInt(req.params.id);
        const contact = contacts.find(c => c.id === contactId);

        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }

        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch contact'
        });
    }
});

// PUT /api/contact/:id - Update contact status
router.put('/:id', (req, res) => {
    try {
        const contactId = parseInt(req.params.id);
        const { status } = req.body;

        const contactIndex = contacts.findIndex(c => c.id === contactId);
        
        if (contactIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }

        if (!['new', 'read', 'responded'].includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status'
            });
        }

        contacts[contactIndex].status = status;
        contacts[contactIndex].updatedAt = new Date().toISOString();

        res.json({
            success: true,
            data: contacts[contactIndex],
            message: 'Contact updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update contact'
        });
    }
});

module.exports = router;
