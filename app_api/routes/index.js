const express = require('express'); 
const router = express.Router(); 


const tripsController = require('../controllers/trips');


router
    .route('/trips') 
    .get(tripsController.tripsList); // List all trips
router
    .route('/trips/:tripCode') 
    .get(tripsController.tripsFindByCode); 

module.exports = router;