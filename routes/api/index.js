const router = require("express").Router();
const officesRoutes = require("./offices");
const employeesRoutes = require("./employees");
const equipmentRoutes = require("./equipment")

// Office routes
router.use("/offices", officesRoutes);
router.use("/employees", employeesRoutes);
router.use("/equipment", equipmentRoutes);

module.exports = router;
