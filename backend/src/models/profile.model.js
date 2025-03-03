import mongoose, { Schema } from "mongoose";


const profileSchema = new mongoose.Schema(
{
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    countryCode:{
        type: String,
        default: "",
    },
    phoneNumber:{
        type: String,
        default: ""
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
        timestamps: true,
})

export const Profile = mongoose.model("Profile", profileSchema)