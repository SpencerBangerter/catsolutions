const router = require("express").Router();
const officesRoutes = require("./offices");
const employeesRoutes = require("./employees");
const equipmentRoutes = require("./equipment")
const userRoutes = require("./user")
const reportRoutes = require("./reports")

// Office routes
router.use("/offices", officesRoutes);
router.use("/employees", employeesRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/user", userRoutes); 
router.use("/reports", reportRoutes);

module.exports = router;
