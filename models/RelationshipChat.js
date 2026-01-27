import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "system"],
    required: true,
  },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RelationshipChatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    profile: {
      yourName: String,
      partnerName: String,
      yourDOB: String,
      partnerDOB: String,
      yourPlace: String,
      partnerPlace: String,
    },

    profileConfirmed: {
      type: Boolean,
      default: false,
    },

    messages: [MessageSchema],

    themeStats: {
      communication: { type: Number, default: 0 },
      trust: { type: Number, default: 0 },
      distance: { type: Number, default: 0 },
      conflict: { type: Number, default: 0 },
      emotion: { type: Number, default: 0 },
      unknown: { type: Number, default: 0 },
    },

    memory: {
      lastTheme: String,
      followUpAsked: Boolean,
    },

    summary: String,

    lastActiveAt: Date,

    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.RelationshipChat ||
  mongoose.model("RelationshipChat", RelationshipChatSchema);
