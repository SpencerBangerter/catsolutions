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

//Double check the functionallity on this one
  updateOffice: function(id, officeData) {
      console.log(officeData, id)
      return axios.put("api/offices/" + id, officeData)
  },

  deleteOffice: function (id) {
      return axios.delete("api/offices/" + id)
  }
};

// export default {
//     // Gets all books
//     getBooks: function() {
//       return axios.get("/api/books");
//     },
//     // Gets the book with the given id
//     getBook: function(id) {
//       return axios.get("/api/books/" + id);
//     },
//     // Deletes the book with the given id
//     deleteBook: function(id) {
//       return axios.delete("/api/books/" + id);
//     },
//     // Saves a book to the database
//     saveBook: function(bookData) {
//       return axios.post("/api/books", bookData);
//     }
//   };
  