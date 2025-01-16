import express from "express";
import { isAuth } from "../middelware/isAuth.js";
import { uploadFiles } from "../middelware/multer.js";
import { createProduct } from "../controllers/Products.js";

const router = express.Router();
router.post("/product/new", isAuth, uploadFiles, createProduct);
export default router;