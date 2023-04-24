import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema({
    userid: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  });
  
  const Payment = mongoose.model('Payment', paymentSchema);

  export default Payment