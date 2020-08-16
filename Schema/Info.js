// Schema for the information that is being sent and
// requested from the database

//  Schema:
//    Date: required
//    Breakfast: optional
//    Lunch: optional
//    Diner: optional
//    Snacks: optional
//    Drinks: optional

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Info = new Schema({
  date: { type: String, required: true },
  breakfast: { type: String, default: "Nothing" },
  lunch: { type: String, default: "Nothing" },
  dinner: { type: String, default: "Nothing" },
  snacks: { type: String, default: "Nothing" },
  drinks: { type: String, default: "Nothing" },
  headache: { type: Boolean, required: true },
});

module.exports = mongoose.model("Info", Info);
