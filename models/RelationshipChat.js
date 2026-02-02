import mongoose, { Schema, models, model } from "mongoose";

/* ===== MESSAGE SUB-SCHEMA ===== */
const MessageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "system"],
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    phase: {
      type: Number,
      enum: [1, 2], // 1 = AI onboarding, 2 = Human takeover
      required: true,
    },

    sentBy: {
      type: String,
      enum: ["ai", "admin"],
      required: false, // user messages won't have this
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

/* ===== MAIN CHAT SCHEMA ===== */
const RelationshipChatSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  /* 🔒 CHAT PHASE (SOURCE OF TRUTH) */
  phase: {
    type: Number,
    enum: [1, 2],
    default: 1, // Phase-1 onboarding
  },

  messages: {
    type: [MessageSchema],
    default: [],
  },

  /* ===== OPTIONAL SYSTEM DATA ===== */
  themeStats: {
    type: Object,
    default: {},
  },

  memory: {
    type: Object,
    default: {},
  },

  /* ===== AUDIT ===== */
  createdAt: {
    type: Date,
    default: Date.now,
  },

  lastActiveAt: {
    type: Date,
    default: Date.now,
  },
});

/* ===== HARD SAFETY VALIDATION ===== */
RelationshipChatSchema.pre("save", function (next) {
  if (this.phase === 2) {
    const hasAIMessage = this.messages.some(
      (msg: any) => msg.sentBy === "ai"
    );

    if (hasAIMessage) {
      return next(
        new Error("AI messages are not allowed after Phase-1")
      );
    }
  }
  next();
});

export default models.RelationshipChat ||
  model("RelationshipChat", RelationshipChatSchema);
