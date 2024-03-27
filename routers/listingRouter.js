const express = require("express");

const {authenticate} = require("../middlewares/authenthicate");

const {
    getAllListings, addListing, getListing, editListing, deleteListing
} = require("../controllers/listingController");

const listingRouter = express.Router();

listingRouter.get("/", getAllListings)
listingRouter.get("/:id", getListing)
 
listingRouter.post("/", authenticate, addListing)
listingRouter.patch("/:id", authenticate, editListing)
listingRouter.delete("/:id", authenticate, deleteListing)

module.exports = {
    listingRouter
}



