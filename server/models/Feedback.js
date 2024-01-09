import mongoose from "mongoose";

const mongo = mongoose;

const FeedbackSchema = new mongo.Schema({
  a_id: { type: mongo.Types.ObjectId, required: true },
  doctor_rating: { type: Number, required: true },
  stay_rating: { type: Number, required: true },
});

const feedbackModel = mongo.model("Feedback", FeedbackSchema);

export default feedbackModel;
