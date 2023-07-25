const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Contact", contactSchema);