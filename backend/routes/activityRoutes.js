const express=require('express');
const Activities = require('../models/Activities');
const  protect  = require('../middleware/authMiddleware');
const BookedActivities = require('../models/BookedActivities');
const router=express.Router()

// @route api/activity/fetch-all
// @description Fetch all activities
// @access Public

router.get('/fetch-all',async(req,res)=>{
    try {
        let activities=await Activities.find({})
        return res.status(200).json(activities)
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Can't able to fetch activities right now"})
        
    }
})

// @route api/activity/book-activity
// @description book a activity by user
// @access Private
router.post('/book-activity',protect,async(req,res)=>{
    const userId = req.user._id;
    const {activityId}=req.body

try {
  const bookActivity = await Activities.findById({ _id: activityId });
  if (!bookActivity) {
    return res.status(404).json({ message: "No such activity found" });
  }
  const users = await BookedActivities.findOne({ user: userId });
  // if already data added in the array it pushes another with reference to userId
  if (users) {
    users.bookedActivity.push({
      activityId: activityId,
      id: bookActivity.id,
      title: bookActivity.title,
      description: bookActivity.description,
      location: bookActivity.location,
      date: bookActivity.date,
      time: bookActivity.time,
    });
    await users.save();
    return res.status(200).json(users);
    // Create data for the first time in the array with reference to userId
  } else {
    const newCart = await BookedActivities.create({
      bookedActivity: {
        activityId: activityId,
        id: bookActivity.id,
        title: bookActivity.title,
        description: bookActivity.description,
        location: bookActivity.location,
        date: bookActivity.date,
        time: bookActivity.time,
      },
      user: userId,
    });
    return res.status(200).json(newCart);
  }
} catch (error) {
    console.error(error);
    return res.status(500).json({message:"Internal Server Error.Please try again."})
    
}
})

// @route api/activity/get-user-activity
// @description get a activity by user
// @access Private

router.get('/get-user-activity',protect,async (req,res)=>{
    const userId = req.user._id;
    try {
        const users = await BookedActivities.findOne({ user: userId });
        if(!users){
            return res.status(200).json({message:"No activities included"})
        }
        if(users){
            return res.status(200).json(users)
        }
    } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Internal Server Error.Please try again." });
        
    }
})



module.exports=router