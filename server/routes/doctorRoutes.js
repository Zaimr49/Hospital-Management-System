import express from "express";
import doctorsModel from "../models/Doctor.js";

const doctorRouter = express.Router();

// get password done
// update info
// create doctor done
// delete doctor (needs to be checked)

// get all doctors

doctorRouter.post("/login", async (req, res, next) => {
  const user = await doctorsModel.findOne({ email: req.body.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "error", message: "Doctor not found" });
  }

  const validate = await user.isPasswordValid(req.body.password);

  if (!validate) {
    return res
      .status(404)
      .json({ status: "error", message: "Incorrect Password" });
  }

  return res.status(201).json({ status: "success", data: [user] });
});

doctorRouter.post("/get-doc-by-name", (req, res) => {
  doctorsModel
    .find({ name: req.body.name })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({ status: "error", message: "No Doc Found" });
      } else {
        res.status(201).json({ status: "success", data: result });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});

doctorRouter.post("/update-info", (req, res) => {
  console.log("here");
  doctorsModel
    .updateOne({ _id: req.body._id }, { $set: req.body })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({ status: "error", message: "doctor not found" });
      } else {
        res.status(201).json({ status: "success", data: result });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

doctorRouter.post("/add-doctor", (req, res) => {
  const doctor = new doctorsModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    speciality: req.body.speciality,
    experience: req.body.experience,
  });
  doctor
    .save()
    .then(() => {
      res.status(201).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

doctorRouter.delete("/delete-doctor", (req, res) => {
  const doctorId = req.body.d_id;

  if (!doctorId) {
    return res
      .status(400)
      .json({ status: "error", message: "Doctor ID is required" });
  }

  doctorsModel
    .findByIdAndDelete({ _id: doctorId })
    .then((deletedDoctor) => {
      if (!deletedDoctor) {
        return res
          .status(404)
          .json({ status: "error", message: "Doctor not found" });
      }
      res
        .status(200)
        .json({ status: "success", message: "Doctor deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

doctorRouter.post("/get-all-doctors", (req, res) => {
  doctorsModel
    .find({})
    .then((doctors) => {
      if (!doctors || doctors.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "No doctors found" });
      }
      res.status(200).json({ status: "success", data: doctors });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

export default doctorRouter;
