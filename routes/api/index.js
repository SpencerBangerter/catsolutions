const router = require("express").Router();
const officesRoutes = require("./offices");
const employeesRoutes = require("./employees");

// Office routes
router.use("/offices", officesRoutes);
router.use("/employees", employeesRoutes);

module.exports = router;
