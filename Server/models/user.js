const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  expoPushToken: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
