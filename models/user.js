import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: String,
    phoneNumber: {
      type: String,
      unique: true,
      required:true,
    },
    email: {
      type: String,
      unique: true,
      required:true,
    },
    username: {
      type: String,
      unique: true,
      required:true,
      index:true,
    },
    password:{
      type:String,
      required:true,
    } 
  });

  const User = mongoose.model('User', userSchema);

export default User