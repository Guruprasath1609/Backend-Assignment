const mongoose=require('mongoose')

// MongoDB connection
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully");
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"MongoDB Connection Failed"})
    }
}
module.exports=connectDB