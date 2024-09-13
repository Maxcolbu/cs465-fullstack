/* GET Homepage */
const index = (reg, res) => {
    res.render('index', { title: "Travlr Gateways"});
};

module.exports = {
    index
}