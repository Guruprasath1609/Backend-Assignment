const mongoose=require('mongoose')

const bookedItemSchema=mongoose.Schema({
    activityId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Activities',
        required:true
    },
    id:String,
    title:String,
    description:String,
    location:String,
    date:String,
    time:String
},
{
    _id:false
})

const bookedActivitiesSchema = mongoose.Schema({
  bookedActivity: [bookedItemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // activityId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Activities",
  //   required: true,
  // },
});

module.exports = mongoose.model("BookedActivities", bookedActivitiesSchema);