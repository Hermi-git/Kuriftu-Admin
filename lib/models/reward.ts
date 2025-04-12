import mongoose from "mongoose";

const RewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  pointValue: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Reward = mongoose.models.Reward || mongoose.model("Reward", RewardSchema);
export default Reward;
