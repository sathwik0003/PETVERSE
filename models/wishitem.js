import mongoose from 'mongoose';

const wishItemSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    },
    description: {
      type: String,
      required: true
    },
    title: {
      type: String,
     
    },
   price : {
      type: Number,
     
    },
    image: {
      type: String,
      required: true
    }
   
  });

  const wishSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
      unique: true
    },
    items: [wishItemSchema]
  });

  const Wish = mongoose.model('Wish', wishSchema);

  export default Wish