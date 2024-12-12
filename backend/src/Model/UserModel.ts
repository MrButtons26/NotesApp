import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, `username is compulsory`],
    trim: [true],
    maxlength: [20, `username must have less than or equal to 20 characters`],
    minlength: [5, `username must have less than or equal to 20 characters`],
    validate: [validator.isAlphanumeric, `Please enter a valid username`],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, `This email is already Registered`],
    lowercase: true,
    validate: [validator.isEmail, `Please enter a valid Email`],
  },
  createdAt: { type: Date, default: Date.now() },
  password: {
    type: String,
    required: [true, `password is compulsory`],
    minlength: 8,
    Select: false,
  },
  notes:[{
    type:mongoose.Schema.ObjectId,
    ref:'Note'
  }]
});


userSchema.methods.correctPassword = async function (
  candidatePassword:string,
  userPassword:string
):Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//pre save middleware for user model
userSchema.pre(`save`, async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//making a model out of the user schema
const User:any = mongoose.model(`User`, userSchema);

export default User;