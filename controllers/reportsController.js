const db = require("../models");

// Defining methods for the reportsController
module.exports = {
    countOffice: function (req, res) {

        db.Equipment
            .find({})
            .select({ _id: 1, initialCost: 1, employee_id: 1 })
            .populate("employee_id")
            .sort({ date: -1 })
            .then(dbEquip => {               
                const officeResult = []
                db.Employee
                    .find({})
                    .select({ _id: 1, office_id: 1 })
                    .sort({ date: -1 })
                    .then(dbEmployee => {                     
                        db.Office
                            .find({})
                            .select({ _id: 1, name: 1 })
                            .then(dbOffices => {                            
                                for (let i = 0; i < dbOffices.length; i++) {
                                    let office = {
                                        _id: dbOffices[i]._id,
                                        name: dbOffices[i].name,
                                        equipmentValue: 0,
                                        numberEmployees: 0
                                    }                           
                                    dbEmployee.forEach(emp => {
                                        const empOfficeId = emp.office_id ? emp.office_id.toString() : "";
                                        if (office._id.toString() === empOfficeId) {
                                            office.numberEmployees++;                                 
                                        }  
                                    }); 

                                    dbEquip.forEach(equip => {
                                        const equipOfficeId = equip.employee_id && equip.employee_id.office_id
                                             ? equip.employee_id.office_id.toString() : "";
                                        if (office._id.toString() === equipOfficeId) {
                                            office.equipmentValue += parseFloat(equip.initialCost);                                 
                                        }  
                                    });                                                                                                  
                                    officeResult.push(office);
                                }                           
                                res.json(officeResult);
                            });
                        });
            }).catch(err => res.status(422).json(err));
    },

    countEquipment : function (req, res) {
        db.Equipment
        .find(req.query)
        .select({ _id: 1, initialCost: 1, employee_id: 1 })
        .sort({ date: -1 })
        .then(dbEquip => {               
            let response = {
                assignedCount : 0,
                assignedValue : 0,
                notAssignedCount : 0,
                notAssignedValue : 0
            }
           dbEquip.forEach(equip => {
                //TODO: check this later
                if(equip.employee_id !== undefined) {
                    response.assignedCount++;
                    response.assignedValue += parseFloat(equip.initialCost);
                } else {
                    response.notAssignedCount++;
                    response.notAssignedValue += parseFloat(equip.initialCost);
                }
            });
            res.json(response);
        }).catch(err => res.status(422).json(err));
    }
};
