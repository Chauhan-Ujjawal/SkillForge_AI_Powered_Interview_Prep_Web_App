const mongoose = require("mongoose");

// Schema banate hain
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } ,
  profileImageUrl: { type: String, default: "" }
}, { timestamps: true });
// Model export karte hain
module.exports = mongoose.model("User", userSchema);
