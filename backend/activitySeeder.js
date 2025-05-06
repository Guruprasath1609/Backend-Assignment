const mongoose=require('mongoose')
const Activities=require('./models/Activities')
const dotenv=require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const activity=[
    {
        id:'1',
        title:'Cricket Match',
        description:"CSK vs MI",
        location:'Mumbai',
        date:'25-05-2025',
        time:'7.00 pm'
    },
    {
        id:'2',
        title:'Movie',
        description:"Retro",
        location:'Rohini Theatre',
        date:'20-05-2025',
        time:'8.00 am'
    },
    {
        id:'3',
        title:'Vacation',
        description:"Beach House",
        location:'Pondicherry',
        date:'29-05-2025',
        time:'10.00 am'
    }
]

Activities.insertMany(activity)
  .then(() => {
    console.log("Seeded Successfully");
  })
  .catch(console.error);