const {StatusCodes} = require("http-status-codes");
const {User} = require("../models/userModel");

const {BadRequestErr, UnauthorizedErr} = require("../error")

const getAllUsers = async (req, res)=>{

    const data = await User.find({});
    const filtered = data.map(item => {
        const {password: pass, ...rest} = item._doc;
        return rest
    })
    res.status(StatusCodes.OK).json({data : filtered})
}

const getUser = async (req, res)=>{
    const {id} = req.params;
    if (!id) {
        throw new BadRequestErr("Invalid username parameter")
    }

    const data = await User.findById(id);
    
    if (!data) {
        res.status(StatusCodes.NOT_FOUND).json({message: 'Data not found'}) 
    }else{
        const {password : pass, ...rest} = data._doc
        res.status(StatusCodes.OK).json({data: rest})
    } 
    
}


const editUser = async (req, res)=>{
    const user = req.user;
    if (user.userID !== req.params.id) {
       throw new UnauthorizedErr("Authentication error: Cant access user data")
    }

    const updatedUser = await User.findByIdAndUpdate(
        user.userID,
        {...req.body},
        { new: true }
    )

    if (!updatedUser) {
        throw new BadRequestErr("User not found");
    }
    res.status(StatusCodes.OK).json({
        data : updatedUser
    })
}

const deleteUser = async (req, res)=>{
    res.status(StatusCodes.OK).json({
        message : "Delete Users"
    })
}


module.exports = {
    getAllUsers, 
    getUser,
    editUser,
    deleteUser
}