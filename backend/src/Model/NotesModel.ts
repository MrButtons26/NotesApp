import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'
import User from '../Model/UserModel'

const notesSchema:any = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now() },
  content:{type:String,required: [true, `username is compulsory`],trim: [true]},
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'User'
  }
});


//pre save middleware for user model
const Notes:any = mongoose.model(`Note`, notesSchema);

export default Notes;