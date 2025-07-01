
const express = require('express');
const router = express.Router();

// Sample trips data (replace with Firebase in production)
const trips = [
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
    },
    {
        id: 3,
        title: "Pachmarhi Hill Station Retreat",
        description: "Rejuvenate in the queen of Satpura with waterfalls, caves, and scenic viewpoints. Perfect for nature lovers and adventure seekers.",
        price: "₹4,200",
        originalPrice: "₹4,800",
        duration: "4 Days / 3 Nights",
        category: "nature",
        difficulty: "moderate",
        groupSize: "6-12 people",
        includes: ["Accommodation", "All meals", "Guide", "Transport", "Permits"],
        excludes: ["Personal expenses", "Equipment rental", "Tips"],
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        availableDates: ["2024-02-18", "2024-02-25", "2024-03-03", "2024-03-10"],
        highlights: ["Bee Falls", "Jata Shankar Cave", "Dhoopgarh Sunset", "Pandav Caves"],
        itinerary: [
            "Day 1: Arrival, local sightseeing",
            "Day 2: Bee Falls, Jata Shankar Cave",
            "Day 3: Dhoopgarh trek, sunset point",
            "Day 4: Pandav Caves, departure"
        ]
    },
    {
        id: 4,
        title: "Kanha National Park Safari",
        description: "Wildlife safari experience in one of India's finest tiger reserves. Spot tigers, leopards, and diverse wildlife in their natural habitat.",
        price: "₹5,500",
        originalPrice: "₹6,200",
        duration: "3 Days / 2 Nights",
        category: "adventure",
        difficulty: "easy",
        groupSize: "4-8 people",
        includes: ["Accommodation", "All meals", "Safari permits", "Guide", "Transport"],
        excludes: ["Camera fees", "Personal expenses", "Tips"],
        imageUrl: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        availableDates: ["2024-02-16", "2024-02-23", "2024-03-02", "2024-03-09"],
        highlights: ["Tiger spotting", "Jeep safari", "Nature walks", "Bird watching"],
        itinerary: [
            "Day 1: Arrival, evening safari",
            "Day 2: Morning and evening safari",
            "Day 3: Final safari, departure"
        ]
    }
];

// GET /api/trips - Get all trips
router.get('/', (req, res) => {
    try {
        const { category, limit } = req.query;
        let filteredTrips = trips;

        if (category && category !== 'all') {
            filteredTrips = trips.filter(trip => trip.category === category);
        }

        if (limit) {
            filteredTrips = filteredTrips.slice(0, parseInt(limit));
        }

        res.json({
            success: true,
            data: filteredTrips,
            count: filteredTrips.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch trips'
        });
    }
});

// GET /api/trips/:id - Get trip by ID
router.get('/:id', (req, res) => {
    try {
        const tripId = parseInt(req.params.id);
        const trip = trips.find(t => t.id === tripId);

        if (!trip) {
            return res.status(404).json({
                success: false,
                error: 'Trip not found'
            });
        }

        res.json({
            success: true,
            data: trip
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch trip'
        });
    }
});

// GET /api/trips/featured - Get featured trips
router.get('/featured/trips', (req, res) => {
    try {
        const featuredTrips = trips.slice(0, 3);
        res.json({
            success: true,
            data: featuredTrips
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch featured trips'
        });
    }
});

module.exports = router;
