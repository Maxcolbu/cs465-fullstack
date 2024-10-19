const mongoose = require('mongoose');
const Trip = require('../models/travlr');  // Register Model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();  // Query all trips

        // If no trips are found, return a 404
        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }

        // Return the list of trips with a 200 status
        return res.status(200).json(trips);

    } catch (err) {
        // Handle any errors (e.g., database connection issues)
        return res.status(500).json({ message: 'Server error', error: err });
    }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode })  // Return single record
        .exec();

    if (!q) {  // Database returned no data
        return res.status(404).json({ message: 'Trip not found' });
    } else {  // Return resulting trip list
        return res.status(200).json(q);
    }
};

// POST: /trips - adds a new trip
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const savedTrip = await newTrip.save();
        return res.status(201).json(savedTrip);
    } catch (err) {
        return res.status(400).json({ message: 'Failed to add trip', error: err });
    }
};

// PUT: /trips/:tripCode - updates a trip
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
    
    const q = await Model
        .findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }  // Return the updated document
        )
        .exec();

    if (!q) {  // Database returned no data
        return res.status(400).json({ message: 'Trip not found or update failed' });
    } else {  // Return resulting updated trip
        return res.status(201).json(q);
    }
};

// Exporting the functions
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
