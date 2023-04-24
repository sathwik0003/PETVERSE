import mongoose from 'mongoose';
const petinfoSchema = new mongoose.Schema({ 
    title: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    race: {
      type: String,
      required: true
    },
    breed: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    piphoneNumber: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  });

  const Petinfo = mongoose.model('Petinfo',petinfoSchema)

  export default Petinfo