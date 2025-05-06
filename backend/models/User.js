const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});


// Prehook to hash passsword before saving into database
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    const salt=await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Method for checking password while login
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("User", userSchema);