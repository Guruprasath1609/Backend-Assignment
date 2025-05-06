const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");

// @route api/user/register
// @description Register a new User
// @access Public

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(500).json({ message: "User already exists. Try with another email." });
    let userphone = await User.findOne({ phone });
    if (userphone) return res.status(500).json({ message: "User already exists. Try with another mobile number." });
    user = new User({ name, email, phone, password });
    await user.save();
    const payload = { user: { id: user._id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "100d" },
      (err, token) => {
        if (err) return err;
        res.status(200).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password,
          },
          token,
          message:"User Registered Successfully"
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "User not registered. Internal Server Error. please try again" });
  }
});

// @route api/user/login
// @description login a  User
// @access Public

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user)
     { return res.status(500).json({ message: "User is not registered" });}
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      {return res.status(500).json({ message: "Password is not matched" });}
    
    const payload = { user: { id: user._id } };
    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn:"100d"},
        (err,token)=>{
            if(err) return err
            res.status(200).json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    password:user.password
                },
                message:"User loggedin Successfully",
                token
            })
        }
    )
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Login failed. Internal Server Error. please try again",
      });
    
  }
});

module.exports = router;
