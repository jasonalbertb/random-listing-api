require('express-async-errors')
require("dotenv").config();

const express = require("express");
const cors = require('cors');
const {connectDB} = require("./config/connectDB");

const path = require('path');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

connectDB()
const port = process.env.PORT || 3000;

//routers
const {userRouter} = require("./routers/userRouter");
const {authRouter} = require("./routers/authRouter");
const {listingRouter} = require("./routers/listingRouter");
//middlewares
const {notFound} = require("./middlewares/notFound");
const {errHandler} = require("./middlewares/errHandler");

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, './public')))
app.use(cookieParser())

app.use("/api/user", userRouter);
app.use("/api/auth" , authRouter);
app.use("/api/listing", listingRouter )

app.use(notFound);
app.use(errHandler);

mongoose.connection.once("open", ()=>{
    console.log("Connected to MongoDB");
    app.listen(port, err=>{
        console.log(err? err : `Server listening at port ${port} `)
    })
})

mongoose.connection.on('error', err=>{
    console.log(err);
})
