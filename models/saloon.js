import mongoose from 'mongoose';
const saloonSchema = new mongoose.Schema({
    saloonTitle: {
      type: String,
      required: true
    },
    saloonDescription: {
      type: String,
      required: true
    },
    saloonLocation: {
      type: String,
      required: true,
      enum: ['Hyderabad', 'Mumbai', 'Chennai', 'Bangalore']
    },
    saloonAddress: {
      type: String,
      required: true
    },
    saloonImage: {
      type: String,
      required: true
    },
    saloonNumber: {
      type: String,
      required: true
    }
  });
  const Saloon= mongoose.model('Saloon',saloonSchema)
  export default Saloon