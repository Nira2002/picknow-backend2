import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    offer: {
        type: String,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
