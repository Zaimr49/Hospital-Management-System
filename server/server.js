import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import patientRouter from "./routes/patientRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import feedbackRouter from "./routes/feedbackRoutes.js";
import { init_db } from "./mongo_init.js";
import doctorRouter from "./routes/doctorRoutes.js";
import staffRouter from "./routes/staffRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const router = express.Router();

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
      console.log("Connected to Database");
    });
  })
  .catch((error) => {
    console.log(error);
  });

const db = mongoose.connection;

// init_db(db);

// Routes

app.use("/", router);

router.use("/patient", patientRouter);
router.use("/app", appointmentRouter);
router.use("/feedback", feedbackRouter);
router.use("/doctor", doctorRouter);
router.use("/staff", staffRouter);
//Make your API calls for every usecase here
