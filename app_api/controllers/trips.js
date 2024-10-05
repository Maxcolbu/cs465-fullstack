const mongoose = require('mongoose');
const Trip = require('../models/travlr'); 


const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();

        if (!trips || trips.length === 0) {
            return res.status(404).json({
                message: 'No trips found'
            });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Error retrieving trips',
            error: err
        });
    }
};


const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode }).exec(); 

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        } else {
            return res.status(200).json(trip); 
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Error retrieving trip',
            error: err
        });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode 
};
