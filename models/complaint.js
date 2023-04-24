import mongoose from 'mongoose';
const complaintSchema = new mongoose.Schema({
    username: { type: String, required: true },
    complaint: { type: String },
    suggestions: { type: String },
    products: { type: String }
  });

  const complaint = mongoose.model('Complaint',complaintSchema)

  export default complaint