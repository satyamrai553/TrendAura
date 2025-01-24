import mongoose from 'mongoose'


async function dbConnect(){
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connecred ! DB host: ${response.connection.host}`);
    }
     catch (error) {
        console.log(`Error while connection to mongoDB: ${error}`)
        process.exit(1);
    }
}

export default dbConnect;