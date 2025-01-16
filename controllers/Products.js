import { Product } from "../models/Product.js";

//Add new product
export const createProduct = async (req, res) => {
  try {
    //Check user role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized Access",
      });
    }
    const { title, description, category, price, mrp, stock, offer, tax } =
      req.body;
    const image = req.file;

    //Validate required fields
    if (!title || !description || !category || !price || !mrp || !stock || !tax) {
      return res.status(400).json({ message: "All fields are required." });
    }

    //Check Image is selected
    if (!image) {
      return res.status(400).json({
        message: "Please upload an image.",
      });
    }

    const product = await Product.create({
      title,
      description,
      category,
      price,
      mrp,
      stock,
      tax,
      image: image.path,
      offer,
    });
    res.status(201).json({
      message: "Product added successfully.",
      product,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};
