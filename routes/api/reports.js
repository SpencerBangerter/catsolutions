const router = require("express").Router();
const reportsController = require("../../controllers/reportsController");

// Matches with "/api/reports/"
router.route("/offices")
  .get(reportsController.countOffice);

  router.route("/equipment")
  .get(reportsController.countEquipment);
module.exports = router;