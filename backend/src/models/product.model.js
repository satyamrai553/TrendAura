import mongoose, { Schema } from "mongoose";
import { Category } from "./category.model";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
    },
    description: {
      type: String,
      required: true,
      minlength: 8,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be less than 0"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be less than 0"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    tags: {
      type: [String], // Allows multiple tags
      enum: [
        "new",
        "bestseller",
        "trending",
        "discounted",
        "limited-edition",
        "summer",
        "winter",
        "casual",
        "formal",
        "streetwear",
      ],
      default: [],
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
