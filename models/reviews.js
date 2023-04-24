import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    product_id:{type:String, required: true},
    review: { type: String },
    star: { type: String }
  });

  const Review= mongoose.model('Review',reviewSchema)

  export default Review