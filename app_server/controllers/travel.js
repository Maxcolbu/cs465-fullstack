const tripsEndpoint = 'http://localhost:3000/api/trips'; 
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

/* GET travel view */
const travel = (req, res) => {
    fetch(tripsEndpoint, options) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error');
            }
            return response.json(); 
        })
        .then(json => {
            
            if (!Array.isArray(json)) {
                throw new Error('Incorrect format.');
            }
            
            
            if (json.length === 0) {
                return res.render('travel', { title: 'Travlr Getaways', trips: [], message: 'No trips available.' });
            }

            console.log(json); 

            res.render('travel', { title: 'Travlr Getaways', trips: json }); 
        })
        .catch(err => {
            console.error(err); 
            res.status(500).send(err.message); 
        });
};

module.exports = {
    travel
};