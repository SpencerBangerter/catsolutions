const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    editPermissions: { type: Boolean, required: true },
    approveOthersPermission: { type: Boolean, required: true },
    approvedStatus: { type: Boolean, required: true },
  
});

const User = mongoose.model("users", userSchema);

module.exports = User;
