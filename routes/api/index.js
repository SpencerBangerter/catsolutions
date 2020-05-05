const router = require("express").Router();
const officesRoutes = require("./offices");
const employeesRoutes = require("./employees");
const equipmentRoutes = require("./equipment")
const userRoutes = require("./user")

// Office routes
router.use("/offices", officesRoutes);
router.use("/employees", employeesRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/user", userRoutes); 

module.exports = router;
