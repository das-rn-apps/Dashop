import { Request, Response } from "express";
import Order from "../models/order.model";
import Razorpay from "razorpay";
import { config } from "../config/loadENV";

const razorpay = new Razorpay({
  key_id:
    config.RAZORPAY_KEY_ID ||
    (() => {
      console.log(config.RAZORPAY_KEY_ID);
      throw new Error("Missing RAZORPAY_KEY_ID");
    })(),
  key_secret:
    config.RAZORPAY_KEY_SECRET ||
    (() => {
      console.log(config.RAZORPAY_KEY_SECRET);
      throw new Error("Missing RAZORPAY_KEY_SECRET");
    })(),
});

export const createOrder = async (req: Request, res: Response) => {
  const { products, total } = req.body;
  const rpOrder = await razorpay.orders.create({
    amount: total * 100,
    currency: "INR",
  });

  const order = await Order.create({
    userId: (req as any).user.id,
    products,
    total,
    razorpayOrderId: rpOrder.id,
  });

  res.json({ order, rpOrder });
};

export const getMyOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: (req as any).user.id }).populate(
    "products.productId"
  );
  res.json(orders);
};
