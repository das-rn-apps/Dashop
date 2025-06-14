import mongoose from "mongoose";
import { config } from "./loadENV";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI || "");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error", err);
    process.exit(1);
  }
};
