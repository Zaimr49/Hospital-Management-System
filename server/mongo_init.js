import mongoose from "mongoose";
import patientsModel from "./models/Patient.js";
import doctorsModel from "./models/Doctor.js";
import staffModel from "./models/Staff.js";
// import visitModel from "./models/Visit.js";
import appointmentModel from "./models/Appointment.js";
import feedbackModel from "./models/Feedback.js";
const mongo = mongoose;

export async function init_db(conn) {
  const db = conn;

  // await db.once("open", async () => {
  //   await patientsModel.collection.drop();
  //   await feedbackModel.collection.drop();
  //   await doctorsModel.collection.drop();
  //   await staffModel.collection.drop();
  //   await appointmentModel.collection.drop();
  // });

  try {
    const patient = new patientsModel({
      name: "Musa Beemar",
      email: "mz@hotmail.com",
      password: "1234567",
    });

    const doctor = new doctorsModel({
      name: "Musa Doctor",
      email: "mz@hotmail.com",
      password: "1234567",
      speciality: "Cardiology",
      experience: 15,
    });

    const staff = new staffModel({
      name: "Musa Admin",
      email: "mz@hotmail.com",
      password: "1234567",
    });

    await patient.save();
    await doctor.save();

    const appointment = new appointmentModel({
      d_id: doctor._id,
      p_id: patient._id,
      confirmation: true,
      disease: "Cardiac Arrest",
    });

    await appointment.save();

    const feedback = new feedbackModel({
      a_id: appointment._id,
      doctor_rating: 5,
      stay_rating: 5,
    });

    await feedback.save();

    await staff.save();
  } catch (error) {
    console.error("Error saving documents:", error);
  }
}
