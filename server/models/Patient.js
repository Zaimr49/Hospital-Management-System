import mongoose from "mongoose";
import bcrypt from "bcrypt";

const mongo = mongoose;

const patientSchema = new mongo.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});


patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 5);
  this.password = hash;

  next();
});

patientSchema.methods.isPasswordValid = async function (password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

const patientsModel = mongo.model("Patients", patientSchema);


export default patientsModel;
