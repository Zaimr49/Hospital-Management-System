import mongoose from "mongoose";

const mongo = mongoose;

const appointmentSchema = new mongo.Schema({
  p_id: { type: mongo.Types.ObjectId, required: true, ref: "Patients" },
  d_id: { type: mongo.Types.ObjectId, required: true, ref: "Doctors" },
  confirmation: { type: Boolean, required: true },
  disease: { type: String, required: true },
});

const appointmentModel = mongo.model("Appointments", appointmentSchema);

export default appointmentModel;
