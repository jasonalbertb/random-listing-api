const mongoose = require("mongoose");
const {isEmail} = require("validator");
const userSchema = mongoose.Schema(
    {
        username: {
            type : String,
            required: [true, "Please enter valid username"],
            unique: true,
            lowercase: true,
            trim : true,
        },
        password : {
            type : String,
            required : [true, "Please enter valid password"]
        },
        email : {
            type : String,
            trim : true,
            lowercase: true,
            unique: true,
            required : [true, "Please enter valid email"],
            validate: [isEmail, 'Please fill a valid email address'],
        },
        photoURL : {
            type : String,
            required : false,
            default : ""
        },
        active :  {
            type: Boolean,
            default: true
        }
      
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}