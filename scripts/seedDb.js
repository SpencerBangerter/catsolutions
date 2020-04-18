const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/catsolutions");

const equipmentSeed = [
    {
        type: 'Laptop',
        model: 'Mac Book Pro 16 inch',
        serialNum: '1234567890',
        condition: 'New',
        purchaseDate:  new Date(Date.now()),
        dateIssued:  new Date(Date.now()),
        initialCost: '',
    },
    {
        type: 'Laptop',
        model: 'PC',
        serialNum: '45678945678',
        condition: 'New',
        purchaseDate:  new Date(Date.now()),
        dateIssued:  new Date(Date.now()),
        initialCost: '',
    },
    
];

const employeeSeed = [
    {
        name: 'Spencer Bangerter',
        address: '123 Main Street',
        city: 'West Jordan',
        state: 'UT',
        zip: '85097',
        equipment: [equipmentSeed[0]]
    },
    {
        name: 'Matthew Grimes',
        address: '1st 2nd Street',
        city: 'Salt Lake City',
        state: 'UT',
        zip: '84101',
        equipment: [equipmentSeed[1]]
    },

];

const officeSeed = [{
    name: "South Jordan Office",
    address: "100 South Main Street",
    city: 'South Jordan',
    state: 'UT',
    zip: "84095",
    managementContact: {},
    employees: [employeeSeed]
}];


db.Office.remove({})
  .then(() => db.Office.collection.insertMany(officeSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
