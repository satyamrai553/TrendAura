import mongoose, {Schema} from "mongoose";


const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 4,
    }
},
{
    timestamps: true,
})


export const Product = mongoose.model("Product", productSchema)