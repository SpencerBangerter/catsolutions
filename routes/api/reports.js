const router = require("express").Router();
const reportsController = require("../../controllers/reportsController");

// Matches with "/api/reports/"
router.route("/offices")
  .get(reportsController.countOffice);

module.exports = router;