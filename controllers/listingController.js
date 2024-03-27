const {StatusCodes} = require("http-status-codes");
const {Listing} = require("../models/listingModel");
const {BadRequestErr} = require( "../error/BadRequestErr");
const {UnauthorizedErr} = require("../error/UnauthorizedErr")

const getAllListings = async(req, res, next)=>{
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let search = req.query.search || '';
    let type = req.query.type;
    if (type === undefined || type === "" || type ==='all') {
        type = { $in : ['sell', 'rent']}
    }
    let parkingSpot = req.query.parking;
    if(parkingSpot === undefined || parkingSpot === 'false'){
        parkingSpot = { $in: [false, true] };
    }
    let furnished = req.query.furnished;
    if(furnished === undefined || furnished === 'false'){
        furnished = { $in: [false, true] };
    }
    let offer = req.query.offer;
    if(offer === undefined || offer === 'false'){
        offer = { $in: [false, true] };
    }

    let sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'asc';

    const listings = await Listing.find({
        name: { $regex: search, $options: 'i' },
        offer, 
        type,
        furnished, parkingSpot,
    }).sort({[sort]: order === 'asc'? 1 : -1}).skip(startIndex).limit(limit)

    if (!listings) {
        throw new BadRequestErr('Listings not found');
    }
    res.status(StatusCodes.OK).json({
        listings
    })
}
const getListing = async(req, res, next)=>{
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw  new BadRequestErr("Invalid username parameter")
    }
    res.status(StatusCodes.OK).json({
        listing 
    })
}

const getListingByUserId = async(req, res, next)=>{
    const {userRef} =  req.body;
    const listings = await Listing.find({userRef})
    if (!listings) {
        throw  new BadRequestErr("Invalid username parameter")
    }
    res.status(StatusCodes.OK).json({
        listings
    })
}

const addListing = async(req, res, next)=>{

    const {userID} = req.user;

    const listing = await Listing.create({...req.body, userRef : userID
    })

    res.status(StatusCodes.OK).json({
        listing 
    })
}

const editListing = async(req, res, next)=>{
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      throw new BadRequestErr("Listing not found");
    }

    if (req.user.userID !== listing.userRef) {
        throw new UnauthorizedErr("You can only edit your own listing");
    }
    const newListing = await Listing.findByIdAndUpdate(req.params.id, req.body,{ new: true });

    res.status(StatusCodes.OK).json({
        listing : newListing
    })
}

const deleteListing = async(req, res, next)=>{
    res.status(StatusCodes.OK).json({
        message : "Delete Listing"
    })
}


module.exports = {
    getAllListings,
    addListing,
    getListing,
    editListing,
    deleteListing,
    getListingByUserId
}