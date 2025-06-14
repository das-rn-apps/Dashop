import { Request, Response } from "express";
import Product from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

export const addProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
