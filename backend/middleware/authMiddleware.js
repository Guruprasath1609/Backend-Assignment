const jwt=require('jsonwebtoken');
const User = require('../models/User');

// Middleware that verifies JWT
const protect=async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            token=req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);
            req.user=await User.findById(decoded.user.id).select('-password')
            // console.log(req.user);
            next()
        } catch (error) {
            console.error(error);
            return res.status(500).json({message:"Invalid/expired Token"})
        }
    }
    else{    
        return res.status(500).json({message:"No token provided"})
    }
}

module.exports=protect