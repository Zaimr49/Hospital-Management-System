import express from "express";
import doctorsModel from "../models/Doctor.js";
import appointmentModel from "../models/Appointment.js";

const appointmentRouter = express.Router();

// create appointment done
// get all appoinments for a doctor done
// get all appointments for a patient done

//For Doctor
// approve an appointment done

appointmentRouter.post("/update-app", (req, res) => {
  appointmentModel
    .updateOne({ _id: req.body.a_id }, { $set: req.body })
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "Appoointment updated successfully",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

appointmentRouter.post("/get-doc-app", async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ d_id: req.body.d_id })
      .populate("p_id", "name")
      .exec();

    if (appointments.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No Appointments found for this Doctor",
      });
    } else {
      res.status(200).json({ status: "success", data: appointments });
    }
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error while fetching appointments",
    });
  }
});


appointmentRouter.post("/get-app-by-disease", (req, res) => {
  appointmentModel
    .find({ disease: req.body.disease })
    .select()
    .then((result) => {
      if (result.length === 0) {
        res
          .status(404)
          .json({ status: "error", message: "No Appointments Found" });
      } else {
        res.status(201).json({ status: "success", data: result });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});

appointmentRouter.post("/get-patient-app", (req, res) => {
  appointmentModel
    .find({ p_id: req.body.p_id })
    .select()
    .populate("p_id", "name")
    .populate("d_id", "name")
    .then((result) => {
      if (result.length === 0) {
        res
          .status(404)
          .json({ status: "error", message: "No Appointment Found" });
      } else {
        res.status(201).json({ status: "success", data: result });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});

appointmentRouter.post("/update-app", (req, res) => {
  appointmentModel
    .updateOne({ _id: req.body.a_id }, { $set: req.body })
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "Appoointment updated successfully",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

appointmentRouter.post("/create-app", (req, res) => {
  doctorsModel
    .find({ _id: req.body.d_id })
    .select()
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({ status: "error", message: "Doctor not found" });
      } else {
        // Doctor found
        const appointment = new appointmentModel({
          d_id: req.body.d_id,
          p_id: req.body.p_id,
          confirmation: false,
          disease: req.body.disease,
        });
        appointment
          .save()
          .then(() => {
            res.status(201).json({ status: "Appointment made successfully" });
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json({
              status: "error",
              message: "Appointment creation failed",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .json({ status: "error", message: "Error Finding Doctor not found" });
    });
});

export default appointmentRouter;
