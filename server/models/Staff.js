import mongoose from "mongoose";
import bcrypt from "bcrypt";

const mongo = mongoose;

const staffSchema = new mongo.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

staffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 5);
  this.password = hash;

  next();
});

staffSchema.methods.isPasswordValid = async function (password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

const staffModel = mongo.model("Staff", staffSchema);

export default staffModel;
