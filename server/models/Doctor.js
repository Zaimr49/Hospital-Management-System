import mongoose from "mongoose";
import bcrypt from "bcrypt";

const mongo = mongoose;

const doctorSchema = new mongo.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  speciality: { type: String, required: true },
  experience: { type: Number, required: true },
});

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 5);
  this.password = hash;

  next();
});

doctorSchema.methods.isPasswordValid = async function (password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

const doctorsModel = mongo.model("Doctors", doctorSchema);

export default doctorsModel;
