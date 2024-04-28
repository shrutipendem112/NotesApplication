import mongoose from "mongoose";

const connectDB = async() => {
    try {
       const dbResponse = await mongoose.connect(process.env.BASE_URL);
       console.log(`Connected at ${dbResponse.connection.host}`.cyan.underline); 
    } catch (error) {
        console.log(`Error: ${error}`.red.underline);
        process.exit(1);        
    }
}
export default connectDB;
