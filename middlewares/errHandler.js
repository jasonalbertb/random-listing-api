const {StatusCodes} = require('http-status-codes');

const errHandler = (error, req, res, next)=>{  
    let statusCode = "";
    let message = "";

    if(error.code === 11000){
        statusCode = StatusCodes.BAD_REQUEST; 
        const {keyValue} = error;
        Object.keys(keyValue).forEach(key=>{
            message = `${key}  already exists`
        })
        
    }else{
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        message = error.message || "Something went wrong"
    
    }   

    res.status(statusCode).json({message, statusCode})
}

module.exports = {
    errHandler
}