import express from "express";
import feedbackModel from "../models/Feedback.js";
import appointmentModel from "../models/Appointment.js";

const feedbackRouter = express.Router();

// create feedback done

//For Doctor
// Get Average Rating of a Doctor done

feedbackRouter.post("/get-doc-avg", (req, res) => {
  appointmentModel
    .find({ d_id: req.body.d_id })
    .then((results) => {
      if (results.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Doctor not found" });
      }

      const promises = results.map((appointment) => {
        return feedbackModel
          .findOne({ a_id: appointment._id })
          .then((result) => {
            return result ? result.doctor_rating : -1;
          })
          .catch((err) => {
            console.log(err);
            throw err; // Rethrow the error to trigger the catch block in the outer promise chain
          });
      });

      return Promise.all(promises)
        .then((ratings) => {
          // Filter out ratings with value -1
          const validRatings = ratings.filter((rating) => rating !== -1);
          // Calculate total and average
          const total = validRatings.reduce((acc, rating) => acc + rating, 0);
          const average =
            validRatings.length > 0 ? total / validRatings.length : 0;
          console.log(validRatings);
          res
            .status(201)
            .json({ status: "Rating found successfully", data: average });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ status: "error", message: "Internal server error" });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .json({ status: "error", message: "Error finding appointments" });
    });
});

feedbackRouter.post("/create-feedback", (req, res) => {
  appointmentModel
    .find({ _id: req.body.a_id })
    .select()
    .then((result) => {
      if (result.length === 0) {
        res
          .status(404)
          .json({ status: "error", message: "Appointment not found" });
      } else {
        // appointment found
        const feedback = new feedbackModel({
          a_id: req.body.a_id,
          doctor_rating: req.body.doctor_rating,
          stay_rating: req.body.stay_rating,
        });
        feedback
          .save()
          .then(() => {
            res.status(201).json({ status: "feedback made successfully" });
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json({
              status: "error",
              message: "feedback creation failed",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        status: "error",
        message: "Error Finding appointment",
      });
    });
});

feedbackRouter.post("/get-feedback-by-app", (req, res) => {
  feedbackModel
    .find({ a_id: req.body.a_id })
    .then((results) => {
      if (results.length === 0) {
        return res
          .status(404)
          .json({ status: "No Feedback", message: "Feedback not found" });
      } else {
        return res
          .status(201)
          .json({ status: "Feedback Found", data: results });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .json({ status: "error", message: "Error finding Feedback" });
    });
});

export default feedbackRouter;
