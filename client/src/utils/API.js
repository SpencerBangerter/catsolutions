import axios from "axios";

// The getOffices method retrieves offices from the server
// It accepts a "query" or term to search the recipe api for
export default {

  getOffices: function() {
    return axios.get("/api/offices");
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
  }
};
