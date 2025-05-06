const express=require('express')
const dotenv=require('dotenv')
const connectDB=require('./db/connectDB')
const userRoute=require('./routes/userRoute')
const activityRoutes=require('./routes/activityRoutes')

dotenv.config()
const app=express()
app.use(express.json())
connectDB()
const PORT= process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Welcome to the Project')
})



app.use('/api/user',userRoute)
app.use('/api/activity',activityRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}` );  
})