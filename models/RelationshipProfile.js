import mongoose from "mongoose";

const RelationshipProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, 
      required: true, 
      unique: true },

    yourName: String,
    partnerName: String,
    yourDOB: String,
    partnerDOB: String,
    yourZodiac: String,
    partnerZodiac: String,
    yourPlace: String,
    partnerPlace: String,
    yourColor: String,
    partnerColor: String,
    duration: String,
  },
  { timestamps: true }
);

export default mongoose.models.RelationshipProfile ||
  mongoose.model("RelationshipProfile", RelationshipProfileSchema);
