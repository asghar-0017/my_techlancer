const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  subject:{
    type:String
  },
  phone:{
    type:Number
  },
  message:{
    type:String
  },
})

module.exports = ClientModel = mongoose.model("Client",ClientSchema)