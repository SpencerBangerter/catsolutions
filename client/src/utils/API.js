import axios from "axios";

// The getOffices method retrieves offices from the server
// It accepts a "query" or term to search the recipe api for
export default {

  getOffices: function() {
    return axios.get("/api/offices");
  },

  getOfficeNames: function() {
    return axios.get("/api/offices/names");
  },

   insertOffice: function(officeData) {
      return axios.post("/api/offices", officeData)
  },

  updateOffice: function(id, officeData) {
      return axios.put("api/offices/" + id, officeData)
  },

  deleteOffice: function (id) {
      return axios.delete("api/offices/" + id)
  },
  
  // Start Employees
  getEmployees: function() {
    return axios.get("/api/employees");
  },

  insertEmployee: function(employeeData) {
      return axios.post("/api/employees", employeeData)
  },

  updateEmployee: function(id, employeeData) {
      return axios.put("api/employees/" + id, employeeData)
  },

  deleteEmployee: function (id) {
      return axios.delete("api/employees/" + id)
  },

  ///// Equipment APIs //////

  getEquipment: function() {
    return axios.get("/api/equipment");
  },

  insertEquipment: function(equipmentData) {
      return axios.post("/api/equipment", equipmentData)
  },

  updateEquipment: function(id, equipmentData) {
      return axios.put("api/equipment/" + id, equipmentData)
  },

  deleteEquipment: function (id) {
      return axios.delete("api/equipment/" + id)
  },

};
