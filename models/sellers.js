import mongoose from 'mongoose';

const sellersSchema = new mongoose.Schema({
    sfullname: String,
    sphoneNumber: {
      type: String,
      unique: true,
      required:true,
    },
    semail: {
      type: String,
      unique: true,
      required:true,
    },
    susername: {
      type: String,
      unique: true,
      required:true,
      index:true,
    },
    spassword:{
      type:String,
      required:true,
    } 
  });

  const Seller = mongoose.model('Seller',sellersSchema)

  export default Seller