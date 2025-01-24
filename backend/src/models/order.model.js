import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true, 
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true, 
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true, 
    },
    shippingAddress: {
      type: String,
      required: true, 
    },
    orderStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending", 
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending", 
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "Internet_Banking"],
      required: true, 
    },
    shippingDate: {
      type: Date,
    },
    deliveryDate: {
      type: Date,
    },
    orderDate: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
