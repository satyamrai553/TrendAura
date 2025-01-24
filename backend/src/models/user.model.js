import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    phoneNumber:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: [true, "password is required"],
        minlength: 8,
    }, 

    
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true   
    },
    fullname:{
        type: String,
        trim: true, 
        index: true 
    },
    avatar:{
        type: String,
        required: true,
    },
    refreshToken:{
        type: String,
    }
},
{
    timestamps: true
})