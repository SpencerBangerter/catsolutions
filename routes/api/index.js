const router = require("express").Router();
const officesRoutes = require("./offices");

// Office routes
router.use("/offices", officesRoutes);

module.exports = router;
