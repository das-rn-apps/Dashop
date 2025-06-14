import { Router } from "express";
import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", getProducts);
router.post("/", protect, addProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
