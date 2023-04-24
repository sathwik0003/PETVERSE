import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
       
      },
      image: {
        type: String,
        required: true
      }
    }],
    total: {
      type: Number,
      
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });

  const Order = mongoose.model('Order', orderSchema);


  export default Order