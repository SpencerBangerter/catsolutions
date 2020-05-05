const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes')
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/api/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("user", userRouter); 
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/catsolutions", { useNewUrlParser: true, useUnifiedTopology: true });



app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});