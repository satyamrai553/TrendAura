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
