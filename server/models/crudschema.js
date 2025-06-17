const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  username:{ type: String, required: true},
  password: { type: String, required: true }
},{Timestamp:true})

const userdata = mongoose.model("user", userschema);

module.exports = {userdata};