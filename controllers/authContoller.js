const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generator = require('generate-password');
const {uniqueNamesGenerator, adjectives, colors, animals} = require("unique-names-generator");

const { BadRequestErr, UnauthorizedErr } = require("../error");

const { User } = require("../models/userModel");

const login = async (req, res) => {
    const { email , password } = req.body;

    if (!email || !password) {
        throw new BadRequestErr("Please enter email and password")
    }


    const user = await User.findOne({ email });
    console.log('user', user);
    if (!user) {
        throw new BadRequestErr("No user found");
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new UnauthorizedErr("Unauthorized access error");
    }

    const token = jwt.sign(
        { userID: user._id, email: user.email },
            process.env.JWT_SECRET,
        { expiresIn: "20d" }
    )
    const { password: pass, ...userDoc } = user._doc;
    res.cookie('access_token', token).status(StatusCodes.OK).json({
        data: userDoc,
        token
    })

}

const googleLogin = async (req, res, next) => {

    const { email , photoURL } = req.body;
    if (!email) {
        throw new BadRequestErr("Please enter email and password")
    }

    let user = await User.findOne({ email });
    if (!user) {
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const seed = new Date();
        const randomName = uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals],
            separator: '-',
            seed: seed.getTime()
        }); // big_red_donkey 

       
        user = await User.create({
            username:  `${randomName}-${seed.getMilliseconds()}`,
            email,
            password: hashPassword,
            photoURL : photoURL || ''
        });
        if (!user) {
            throw new BadRequestErr("User not created")
        }
    }

    const token = jwt.sign(
        { userID: user._id, email: user.email },
            process.env.JWT_SECRET,
        { expiresIn: "20d" }
    )
    const { password: pass, ...userDoc } = user._doc;
    res.cookie('access_token', token).status(StatusCodes.OK).json({
        data: userDoc,
        token
    })
}

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new BadRequestErr("Please enter username, email and password")
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email,
        password: hashPassword
    });

    if (!user) {
        throw new BadRequestErr("User not created")
    }


    res.status(StatusCodes.OK).json({ message: `User ${user.username} created`, user })

}

const logout = async (req, res, next) => {
    res.clearCookie('access_token');
    res.status(StatusCodes.OK).json({ message: "User has logged out" })
};



module.exports = {
    login,
    register,
    logout,
    googleLogin
}