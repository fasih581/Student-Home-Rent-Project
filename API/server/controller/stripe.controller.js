const asyncHandler = require("express-async-handler");
const stripe = require('stripe')('sk_test_51Ot8s3SBLrIxSJemRMQ0AcCP2fperXPRqquGxiWDVni5trDhC64B0I8nlflx4kpIynpa3eiE3tZLtFiCAeWIyxns00fMGAz7uz');

const HomeModal = require('../model/superAdminModel/house');
const CheckOut = require('../model/checkOut.modal'); 


exports.StripePost = asyncHandler(async (req, res) => {
  try {
    const { houseId, customerEmail } = req.body;

    // Fetch the house details from the database
    const house = await HomeModal.findById(houseId).populate('location');

    const lineItems = [{
      name: house.houseName,
      description: `Rent: ${house.rate}`,
      amount: house.rate,
      currency: 'usd',
      images: [house.image],
    }];

    const metadata = {
      address: house.address,
      location: house.location.name,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // success_url: `${YOUR_DOMAIN}?success=true`,
      // cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      metadata: metadata,
    });

    // Save checkout details in your CheckOut model
    const checkout = new CheckOut({
      userId: req.user._id, 
      houseId: houseId,
      Amount: house.rate,
      billingAddress: house.address,
      customerEmail: customerEmail,
      checkInDate: new Date(), 
      orderStatus: 'pending', 
    });

    await checkout.save();

    checkout.orderStatus = 'complete';
    await checkout.save();

    res.redirect(303, session.url);

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});





  