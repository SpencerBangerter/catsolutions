const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Office collection and inserts the Office below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/catsolutions");

const equipmentSeed = [
  {
    type: "Laptop",
    model: "Mac Book Pro 16 inch",
    serialNum: "1234567890",
    condition: "New",
    purchaseDate: new Date(Date.now()),
    dateIssued: new Date(Date.now()),
    initialCost: "",
  },
  {
    type: "Laptop",
    model: "PC",
    serialNum: "45678945678",
    condition: "New",
    purchaseDate: new Date(Date.now()),
    dateIssued: new Date(Date.now()),
    initialCost: "",
  },
];

const employeeSeed = [
  {
    name: "Spencer Bangerter",
    address: "123 Main Street",
    city: "West Jordan",
    state: "UT",
    zip: "85097",
    equipment: [],
  },
  {
    name: "Matthew Grimes",
    address: "1st 2nd Street",
    city: "Salt Lake City",
    state: "UT",
    zip: "84101",
    equipment: [],
  },
];

const officeSeed = {
  name: "South Jordan Office",
  address: "100 South Main Street",
  city: "South Jordan",
  state: "UT",
  zip: "84095",
  managementContact: "Jonathan Bejarano",
  managementContactPhone: "5555551234",
  employees: {},
};

db.Office.deleteMany({})
  .then(() => db.Office.collection.insertOne(officeSeed))
  .then(async (data) => {
    console.log(data.result.n + ' records inserted!');
    await seedEmployees(data.insertedId)
    // process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

async function seedEmployees(officeId) {
  console.log(officeId)
  const office = await db.Office.findById(officeId)
  console.log(office.name)
  await db.Employee.deleteMany({})
  db.Employee.collection.insertMany(employeeSeed)
    .then(async (data) => {
      console.log(data.result.n + ' records inserted!');
      // console.log(data);
      office.employees.push(data.insertedIds['0'], data.insertedIds['1'])
      console.log(office);
      await db.Office.updateOne(office)
      await db.Equipment.deleteMany({})
      await seedEquipment(data.insertedIds['0'], '0')
      await seedEquipment(data.insertedIds['1'], '1')

    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

async function seedEquipment(employeeId, index) {
    console.log(employeeId)
    const employee = await db.Employee.findById(employeeId)
    console.log(employee.name)
    db.Equipment.collection.insertOne(equipmentSeed[parseInt(index)])
      .then(async (data) => {
        console.log(data.result.n + ' records inserted!');
        console.log('NEWEST CONSOLE LOG ::  ', data.insertedId);
        employee.equipment.push(data.insertedId)
        console.log(employee);
        await db.Employee.updateOne(employee)
        process.exit(0);
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  }
  


