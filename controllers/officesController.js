const db = require("../models");

// Defining methods for the officesController
module.exports = {
  findAll: function(req, res) {
    db.Office
      .find(req.query)
      .populate('employees')
      .sort({ date: -1 })
      .then(dbModel => {res.json(dbModel)})
      .catch(err => res.status(422).json(err));

  },
  findById: function(req, res) {
    db.Office
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Office
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Office
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Office
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
