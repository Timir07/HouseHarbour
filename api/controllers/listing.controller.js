import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);//it take json.stringify as input from frontend
        return res.status(201).json(listing)
    } catch (error) {
        next(error);
    }
}