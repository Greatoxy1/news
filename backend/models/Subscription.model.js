import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    endpoint: {
      type: String,
      required: true,
      unique: true
    },
    keys: {
      p256dh: String,
      auth: String
    },
    topic: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);
