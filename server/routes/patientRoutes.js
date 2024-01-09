import express from "express";
import patientModel from "../models/Patient.js";
import doctorsModel from "../models/Doctor.js";
import appointmentModel from "../models/Appointment.js";

const patientRouter = express.Router();

console.log("here");

// get password done
// update info done
// create patient done
// delete patient (needs to be checked)

patientRouter.post("/login", async (req, res) => {
  const user = await patientModel.findOne({ email: req.body.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "error", message: "Patient not found" });
  }

  const validate = await user.isPasswordValid(req.body.password);

  if (!validate) {
    return res
      .status(404)
      .json({ status: "error", message: "Incorrect Password" });
  }

  return res.status(201).json({ status: "success", data: [user] });
});

patientRouter.post("/update-info", (req, res) => {
  patientModel
    .updateOne({ _id: req.body._id }, { $set: req.body })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({ status: "error", message: "Patient not found" });
      } else {
        res.status(201).json({ status: "Patient Updated", data: result });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

patientRouter.post("/add-patient", (req, res) => {
  const Patient = new patientModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  Patient.save()
    .then(() => {
      res.status(201).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

patientRouter.delete("/delete-patient", (req, res) => {
  const patientId = req.body.p_id;

  if (!patientId) {
    // console.log("in if");
    return res
      .status(400)
      .json({ status: "error", message: "Patient ID is required" });
  }

  patientModel
    .findByIdAndDelete({ _id: patientId })
    .then((deletedPatient) => {
      if (!deletedPatient) {
        return res
          .status(404)
          .json({ status: "error", message: "Patient not found" });
      }
      res
        .status(200)
        .json({ status: "success", message: "Patient deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

patientRouter.post("/get-all-patients", (req, res) => {
  patientModel
    .find({})
    .then((patients) => {
      if (!patients || patients.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "No patients found" });
      }
      res.status(200).json({ status: "success", data: patients });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

patientRouter.post("/search-patient-by-name", (req, res) => {
  const patientName = req.body.name;

  if (!patientName) {
    return res
      .status(400)
      .json({ status: "error", message: "Patient name is required" });
  }

  patientModel
    .find({ name: patientName })
    .then((patients) => {
      if (!patients || patients.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "No patients found with the given name",
        });
      }
      res.status(200).json({ status: "success", data: patients });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

export default patientRouter;
