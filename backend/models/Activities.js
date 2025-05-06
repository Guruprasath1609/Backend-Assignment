const mongoose=require('mongoose')

const activitySchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  }
});

module.exports=mongoose.model('Activities',activitySchema)