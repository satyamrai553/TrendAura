import mongoose from 'mongoose'


const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        lowercase: true,
        unique: true,        
    }
},{timestamps: true})


const Category = mongoose.model("Category", categorySchema);

export {
    Category
}