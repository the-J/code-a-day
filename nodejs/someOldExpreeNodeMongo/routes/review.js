// Adding parameter for searching in dbs
var Company = require('../models/company');

module.exports = (app) => {

  // want to add value to input field in review for so need to add searching param
  app.get('/review/:id', (req, res) => {
      // Search db for company
      // Now will add <%= user.company.name %> and <%= data.name%> in review.ejs
      Company.findOne({'_id': req.params.id}, (err, data) => {
        res.render('company/review', {title: 'Company Review', user: req.user, data: data});
      })
  });
}
