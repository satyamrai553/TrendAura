import mongoose,{Schema} from "mongoose";


const reviewSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    comment:{
        type: String,
    }
},
    {
        timestamps: true,
    })


export const Review = mongoose.model("Review", reviewSchema)