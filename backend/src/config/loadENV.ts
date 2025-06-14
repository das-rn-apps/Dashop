// src/config/config.ts
import dotenv from "dotenv";
dotenv.config();

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const config = {
  PORT: getEnvVariable("PORT"),
  MONGO_URI: getEnvVariable("MONGO_URI"),
  JWT_SECRET: getEnvVariable("JWT_SECRET"),
  RAZORPAY_KEY_ID: getEnvVariable("RAZORPAY_KEY_ID"),
  RAZORPAY_KEY_SECRET: getEnvVariable("RAZORPAY_KEY_SECRET"),
};
