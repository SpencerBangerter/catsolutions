const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const officeSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  managementContact: {},
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }]

});

const employeeSchema = new Schema({
  name: { type: String, required: true },
  // office_id: { type: Schema.Types.ObjectId, ref: 'Office' },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  equipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }]

});

const equipmentSchema = new Schema({
  type: { type: String, required: true },
  model: { type: String, required: true },
  serialNum: { type: String, required: true },
  condition: { type: String, required: true },
  purchaseDate: { type: Date, default: Date.now },
  dateIssued: { type: Date, default: Date.now },
  initialCost: { type: String, required: true },
});

//HISTORICAL LOGS



const Office = mongoose.model("Office", officeSchema);
const Employee = mongoose.model("Employee", employeeSchema);
const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = {Office, Employee, Equipment};


// const personSchema = Schema({
//   _id: Schema.Types.ObjectId,
//   name: String,
//   age: Number,
//   stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// });

// const storySchema = Schema({
//   author: { type: Schema.Types.ObjectId, ref: 'Person' },
//   title: String,
//   fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
// });

// const Story = mongoose.model('Story', storySchema);
// const Person = mongoose.model('Person', personSchema);
