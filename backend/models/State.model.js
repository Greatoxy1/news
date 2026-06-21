import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: String,
    required: true
  }
});

export default mongoose.model("State", stateSchema);