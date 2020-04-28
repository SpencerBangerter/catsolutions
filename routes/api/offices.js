const router = require("express").Router();
const officesController = require("../../controllers/officesController");

// Matches with "/api/offices"
router.route("/")
  .get(officesController.findAll)
  .post(officesController.create);

  router.route("/names")
  .get(officesController.findNames);
  
// Matches with "/api/offices/:id"
router
  .route("/:id")
  .get(officesController.findById)
  .put(officesController.update)
  .delete(officesController.remove);

module.exports = router;
