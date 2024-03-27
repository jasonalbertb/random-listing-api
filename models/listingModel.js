const mongoose = require("mongoose");

const arrayLimit = (val) =>{
    return val.length <= 6;
}

const listingSchema = mongoose.Schema(
    {
        name :{
            required: true,
            type : String
        },
        description : {
            required: true,
            type : String
        },
        address : {
            required : true,
            type : String
        },
        type : {
            required : true,
            type : String,
            enum : ['sell', 'rent']
        },
        beds : {
            required: true,
            type: Number
        },
        baths : {
            required : true,
            type : Number
        },
        parkingSpot : {
            required : true, 
            type : Boolean ,
        },
        furnished : {
            required : true,
            type : Boolean
        },
        offer : {
            required : true,
            type : Boolean
        },
        regularPrice : {
            required : true,
            type : Number 
        },
        discountedPrice : {
            required : true,
            type : Number
        },
        imageUrls: {
            required : true,
            type : Array,
            validate: [arrayLimit, 'imageUrls exceeds the limit of 6']
        },
        userRef : {
            required : true,
            type : String
        }
    },
    {
        timestamps: true
    }
)

const Listing = mongoose.model("Listing", listingSchema)

module.exports = {
    Listing
}