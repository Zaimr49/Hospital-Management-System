import express from "express";
import staffModel from "../models/Staff.js";

const staffRouter = express.Router();

//Staff
// CUD Staff Done
// CRUD Patient  Read all
// CRUD doctor  Read all

// Search Patient by Name

//Patient Use Cases
// RU Info done
// CR Appointments done
// C Feedbacks Done

// Search Doctor by Name done

//Doctor UseCases
// RU info done
// R Average Feedback done

// U Appointment(approve appointmeet) done

// Search Appointment by Disease done

staffRouter.post("/login", async (req, res) => {
  const user = await staffModel.findOne({ email: req.body.email });

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

staffRouter.post("/update-info", (req, res) => {
  staffModel
    .updateOne({ _id: req.body._id }, { $set: req.body })
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Invalid Staff ID" });
      }
      res.status(200).json({ status: "Staff Info Updated", data: result });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

staffRouter.post("/add-staff", (req, res) => {
  const newStaff = new staffModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  newStaff
    .save()
    .then(() => {
      res.status(201).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

staffRouter.delete("/delete-staff", (req, res) => {
  const staffId = req.body.s_id;

  staffModel
    .findByIdAndDelete({ _id: staffId })
    .then((deletedStaff) => {
      if (deletedStaff.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Staff member not found" });
      }
      res.status(200).json({
        status: "success",
        message: "Staff member deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    });
});

export default staffRouter;
