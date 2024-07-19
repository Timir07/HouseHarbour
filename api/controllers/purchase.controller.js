// purchase.controller.js

import Stripe from "stripe";
import dotenv from "dotenv";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import Purchase from "../models/purchase.model.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Controller function to initiate the purchase
export const initiatePurchase = async (req, res) => {
  const { listingId } = req.params;
  const { userId } = req.body; 
  console.log(listingId);
  console.log(userId);

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    const purchasePrice = listing.offer
      ? listing.discountPrice
      : listing.regularPrice;
    const seller = await User.findById(listing.userRef);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    // Create a Checkout Session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: listing.name,
            },
            unit_amount: purchasePrice * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        userId: userId, 
        listingId: listing._id.toString(),
      },
    });

    // Create a Purchase record in your database
    const newPurchase = new Purchase({
      listingId: listing._id,
      buyerId: userId, 
      sellerId: seller._id,
      purchasePrice,
      paymentIntentId: session.payment_intent,
    });

    await newPurchase.save();

    // Send Checkout Session ID to frontend to redirect to payment page
    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.error("Error initiating purchase:", err);
    res.status(500).json({ error: "Failed to initiate purchase" });
  }
};
