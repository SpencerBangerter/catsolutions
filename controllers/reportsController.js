const db = require("../models");

function getRemoteOfficeEmployees(employees, equipment, offices) {
    let remoteOffice = {
        _id: "0",
        name: "Remote",
        equipmentValue: 0,
        employees: 0
    }

    employees.forEach(emp => {
        const empOfficeId = offices.includes(emp.office_id) ? false : emp.office_id;                                                
        if (!empOfficeId) {
            remoteOffice.employees++;
        }
    });

    equipment.forEach(equip => {
        let equipOfficeId = true;
        if (equip.employee_id && equip.employee_id.office_id) {
            equipOfficeId =  offices.includes(equip.employee_id.office_id.toString()) ? 
                true : false;
        }
        if (!equipOfficeId) {
            const initialCost = equip.initialCost ? equip.initialCost : 0;
            remoteOffice.equipmentValue += parseFloat(equip.initialCost);
        }
    });

    return remoteOffice;
}

// Defining methods for the reportsController
module.exports = {
    countOffice: function (req, res) {

        db.Equipment
            .find({})
            .select({ _id: 1, initialCost: 1, employee_id: 1 })
            .populate("employee_id")
            .sort({ date: -1 })
            .then(dbEquip => {
                const officeResult = [];
                const offices=[];
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
                                        employees: 0
                                    }
                                    dbEmployee.forEach(emp => {
                                        const empOfficeId = emp.office_id ? emp.office_id.toString() : false;
                                        if (office._id.toString() === empOfficeId) {
                                            office.employees++;
                                            offices.push(office._id.toString());
                                        }
                                    });

                                    dbEquip.forEach(equip => {
                                        const equipOfficeId = equip.employee_id && equip.employee_id.office_id
                                            ? equip.employee_id.office_id.toString() : "";
                                        if (office._id.toString() === equipOfficeId) {
                                            const initialCost = equip.initialCost ? equip.initialCost : 0;
                                            office.equipmentValue += parseFloat(initialCost);
                                        }
                                    });
                                    officeResult.push(office);
                                }
                                officeResult.push(getRemoteOfficeEmployees(dbEmployee, dbEquip,offices));
                                res.json(officeResult);
                            });
                    });
            }).catch(err => res.status(422).json(err));
    },

    countEquipment: function (req, res) {
        db.Equipment
            .find(req.query)
            .select({ _id: 1, initialCost: 1, employee_id: 1 })
            .populate("employee_id")
            .sort({ date: -1 })
            .then(dbEquip => {
                let response = {
                    assignedCount: 0,
                    assignedValue: 0,
                    notAssignedCount: 0,
                    notAssignedValue: 0
                }
                dbEquip.forEach(equip => {
                    //TODO: check this later
                    if (equip.employee_id === null) {
                        response.notAssignedCount++;
                        const initialCost = equip.initialCost ? equip.initialCost : 0;
                        response.notAssignedValue += parseFloat(initialCost);
                        
                    } else {
                        response.assignedCount++;
                        const initialCost = equip.initialCost ? equip.initialCost : 0;
                        response.assignedValue += parseFloat(initialCost); 
                    }
                });
                res.json(response);
            }).catch(err => res.status(422).json(err));
    }
};
