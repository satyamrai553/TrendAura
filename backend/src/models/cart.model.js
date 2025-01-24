import mongoose, {Schema} from "mongoose";



const CartSchema = new Schema({
    
}, 
{
    timestamps: ture
})

export const Cart = mongoose.model("Cart", CartSchema)