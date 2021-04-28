const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HhjoHB3oRcFFDwOwhbo7e82nM7rZQkLB8eDEoe9QA6rKy3AT8ORr01RcLUhCr1brsxyZWnutUc45cS1ZW3Azwsh00cFPRAuIi"
);
// this is secret key from stripe.com > API KEYS

//this is the setup needed to get the backend express app running on cloud function.
//Settting up API

// - App config
const app = express(); //set express server app

// - Middlewares
app.use(cors({ origin: true })); // cors think of it as security
app.use(express.json()); //allow us to send data and pass it in json format.

// - API Routes //APIs have many Different requests!! app.getrequest, app.postrequest

app.get("/", (request, response) => response.status(200).send("hello world"));
//dummy route for testing

//post request at this route "/payment/create" then async and will take ()
app.post("/payments/create", async (request, response) => {
  const total = request.query.total; //access query-> access total.

  console.log("Payment request received for this amount BOOM!>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    //*******Is this stripe.paymentIntents */ or /* paymentIntent confused???
    //pass in objects inside {}
    amount: total, //subunits of the currencry 10000
    currency: "usd", //change it according to country code
  });
  //response.status is 201 means, it went OK, something created
  response.status(201).send({
    //send back clientSecret which is paymentIntent which we got from stripe
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen Command
exports.api = functions.https.onRequest(app);

// Example API endpoint
//http://localhost:5001/clone-319f0/us-central1/api
// this link will show "hello world" gets it from api routes

/***** 
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

*/ ///
