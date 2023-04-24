import mongoose from 'mongoose';
const serviceSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    service: {
      type: String,
      required: true
    },
    timings: {
      type: String,
      required: true
    },
    center: {
      type: String,
      required: true
    }
  });
  const Service=mongoose.model('Service',serviceSchema) 
  export default Service