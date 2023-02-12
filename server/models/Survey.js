const recipientSchema = require("./Recipient");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { Number, default: 0 },
  no: { Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model("surveys", surveySchema);
