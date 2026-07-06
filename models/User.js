const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  userId:{
    type:String,
    unique:true
  },

  displayName:{
    type:String,
    default:""
  },

  level:{
    type:Number,
    default:1
  },

  exp:{
    type:Number,
    default:0
  },

  banana:{
    type:Number,
    default:0
  },

  ticket:{
    type:Number,
    default:0
  },

  signDays:{
    type:Number,
    default:0
  },

  joinDate:{
    type:Date,
    default:Date.now
  },

  todayExp:{
    type:Number,
    default:0
  },

  todayBanana:{
    type:Number,
    default:0
  },

  vip:{
    type:Boolean,
    default:false
  },

  badge:{
    type:String,
    default:"初心之蕉"
  },

  title:{
    type:String,
    default:"新手"
  }

});

module.exports = mongoose.model("User",UserSchema);
