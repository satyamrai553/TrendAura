import mongoose, { Mongoose, Schema } from "mongoose";


const addressSchema = new mongoose.Schema({
    addressLine1:{
        type: String,
        required: true
    },
    addressLine2:{
        type: String
    },
    pincode:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }

},{
    timestamps: true
})

export const Address = mongoose.model("Address", addressSchema);