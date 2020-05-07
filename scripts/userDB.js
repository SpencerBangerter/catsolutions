const mongoose = require("mongoose");
const User = require("../models/users");

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/catsolutions'
  )


const userSeed = {
      username: 'Username3',
      password: 'Password3',
      role: 'user',
};


User.collection.insertOne(userSeed).then(data => console.log(data));