import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema({
  userId: String,
  themes: [String],
  summary: String,
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Summary ||
  mongoose.model("Summary", SummarySchema);
