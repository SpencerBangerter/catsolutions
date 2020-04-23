import axios from "axios";

// The getOffices method retrieves offices from the server
// It accepts a "query" or term to search the recipe api for
export default {

  getOffices: function() {
    return axios.get("/api/offices");
  },

  insertOffice: function(query) {
      return axios.post("/api/offices", query)
  },

  updateOffice: function(query) {
      return axios.put("api/offices/:id", query)
  }
};