const asyncHandler = require("express-async-handler");
const stripe = require('stripe')('sk_test_51Oy8ToSBsydMCFgTE5PJQEFgVH6BzZI4dCNxQmTpiB7Dwlk3k9T1YoOZyDRuYLgo3djy9d14U5uDE5H30x3pKcjF00yqmtnlRP');

const HomeModal = require('../model/superAdminModel/house');
const CheckOut = require('../model/checkOut.modal'); 

// exports.StripePost = asyncHandler(async (req, res) => {
//   try {
//     const { homeId, userId } = req.body;

//     // Fetch the house details from the database
//     const house = await HomeModal.findById(homeId).populate('location');

//     if (!house) {
//       return res.status(404).json({ error: 'House not found', homeId: homeId });
//     }

//     const lineItems = [{
//       price_data: {
//         currency: 'usd',
//         unit_amount: house.rate * 100, // Stripe expects amount in cents
//         product_data: {
//           name: house.houseName,
//           // images: [house.image] 
//         }
//       },
//       quantity: 1 
//     }];

//     const metadata = {
//       address: house.address,
//       location: house.location.name,
//     };

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'], 
//       line_items: lineItems,
//       mode: 'subscription', 
//       success_url: `http://localhost:5173/success`,
//       cancel_url: `http://localhost:5173/cancel`,
//       metadata: metadata,
//     });

//     // Save checkout details in your CheckOut model
//     const checkout = new CheckOut({
//       userId: userId, 
//       houseId: homeId,
//       Amount: house.rate,
//       billingAddress: house.address,
//       customerEmail: req.user.email, 
//       checkInDate: new Date(), 
//       orderStatus: 'pending', 
//     });

//     await checkout.save();

//     checkout.orderStatus = 'complete';
//     await checkout.save();

//     res.status(200).json({ url: session.url });

//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     res.status(500).json({ error: 'Failed to create checkout session' });
//   }
// });



exports.StripePost = asyncHandler(async (req, res) => {
  try {
    const { homeId, userId } = req.body;

    // Fetch the house details from the database
    const house = await HomeModal.findById(homeId).populate('location');

    if (!house) {
      return res.status(404).json({ error: 'House not found', homeId: homeId });
    }

    // Check if user object is available in the request
    const customerEmail = req.user ? req.user.email : 'unknown';

    const lineItems = [{
      price_data: {
        currency: 'usd',
        unit_amount: parseInt(house.rate),
        product_data: {
          name: 'Subscription Plan', 
          description: 'Your subscription plan description here' 
        },
        recurring: {
          interval: 'month', 
        },
      },
      quantity: 1 
    }];
    

    const metadata = {
      address: house.address,
      location: house.location.name,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], 
      line_items: lineItems,
      mode: 'subscription',
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancel`,
      metadata: metadata,
    });

    // Save checkout details in your CheckOut model
    const checkout = new CheckOut({
      userId: userId, 
      houseId: homeId,
      Amount: house.rate,
      billingAddress: house.address,
      customerEmail: customerEmail,
      checkInDate: new Date(), 
      orderStatus: 'pending', 
    });

    await checkout.save();

    checkout.orderStatus = 'complete';
    await checkout.save();

    res.status(200).json({ url: session.url });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});
