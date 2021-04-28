import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; //import dependencies from stripe
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

//YOUTUBE 5:25:00
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue(); //using hook method created before

  const history = useHistory();

  //USING POWERFUL HOOKS
  const stripe = useStripe();
  const elements = useElements();
  //FOR PAYMENT
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  //NEED 2 state for handleChange () method
  const [error, setError] = useState(null); //variables in react
  const [disabled, setDisabled] = useState(true);

  const [clientSecret, setClientSecret] = useState(true);

  // **TIME 6:16:00 - 6:20:57
  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    //but whenever the basket changes we need a new stripe secret
    const getClientSecret = async () => {
      // ASYNC function inside of useEffect
      const response = await axios({
        // axios is a way of making request, postrequest,getrequest
        //pass in object here and inside we said method:post cuz we are making a POST-REQUEST**
        method: "post", // axios is a way of making request, postrequest,getrequest
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`, //get basket *100 to get the subunits
      }); //we passed in ?total variable here.. ?total QUERY PARAM.  we use this in API
      //STRIPE expects the total in a currencies subunits(USE *100 ): meaning $10 is 10000, ten thousands

      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]); //whenever the basket changes it will make above request and will update the SPECIAL STRIPE SECRET which allows us to charge the customer with the correct amount.
  // this run payment component load as well as the variable in the [basket]

  console.log("THE SECRET is >>>", clientSecret);
  console.log("👨🏻‍💻", user);

  // **handleSubmit () function
  const handleSubmit = async (event) => {
    //takes event e
    //DO STRIPE STUFF HERE
    event.preventDefault(); //this will stop from refreshing
    setProcessing(true); //this will prevent the Buy Now button from hiting again and again, only once

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          //TIME 6:28:50
          card: elements.getElement(CardElement),
        },
      })
      //paymentIntent is= payment confirmation
      .then(({ paymentIntent }) => {
        //when the order comes back successfull reach into db
        /// db 7:27:00//target users
        db.collection("users") // using no sequeul collection document data structure
          .doc(user?.uid) //document we are accessing is user and their id **BUT USE uid
          .collection("orders") //go into thats users order
          .doc(paymentIntent.id) // create a paymentIntent ID and add below information
          .set({
            // then set inside{}
            basket: basket, //pass the basket item before emptying the basket
            amount: paymentIntent.amount, //pass the amount
            created: paymentIntent.created, //also pass the created date, timestamp when the order was created.
          });

        //if .then (paymentIntent) everything is good then we say
        setSucceeded(true); // true because transaction was good
        setError(null); // there will be no error
        setProcessing(false); //nothing will be processing anymore
        //because we setProcessing to (true) above line53, now we set to false.

        //7:14:36
        dispatch({
          //after the payment process we wanna empty the basket
          type: "EMPTY_BASKET",
        });

        history.replace("/orders"); //history.replace not push this time because we dont want user to go back
      });
  };

  // **handleChange () function
  const handleChange = (event) => {
    //**THIS Listens for changes in the CardElement
    //and display any errors as the customer types their card details
    setDisabled(event.empty); //if the event is empty disable the button
    setError(event.error ? event.error.message : ""); //if theres an error, show error otherwise show nothing
  };

  return (
    <div className="payment">
      <div className="payment__container">
        {/* **YOUTUBE 5:38:00 */}
        {/* link to checktout and shows how many basket items is there */}
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items </Link>)
        </h1>
        {/* payment section -delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            {/* pull in email address from useStateValue ,CONTEXT API*/}
            {/* user?.email optional chaining incase user is undefined */}
            <p>13 Helen Avenue</p>
            <p>Feltham, London</p>
          </div>
        </div>

        {/* payment section -review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((
              item //for every single item inside the basket return checkout product
            ) => (
              <CheckoutProduct
                id={item.id} //pass in all props
                title={item.title}
                image={item.image}
                price={item.price}
                ratingStar={item.ratingStar}
                ratingNumber={item.ratingNumber}
              />
            ))}

            {/* show products here */}
          </div>
        </div>

        {/* payment section -payment method */}
        <div className="payment__section">
          {/* **STRIPE */}
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__details">
            {/* USE OF STRIPE, Can also use of re-occuring subscription payments */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              {/* <CardElememt/> shows cardnumber  mm/yy/cvc */}
              <div className="payment_priceContainer">
                {/* Showing order Total*/}
                <CurrencyFormat
                  // renders out some text with value
                  renderText={(value) => (
                    <h3>Order Total: {value}</h3> //with some value
                  )}
                  decimalScale={2} //two decimal places .00
                  value={getBasketTotal(basket)} // total gets passed here
                  displayType={"text"} //display type is just plain text
                  thousandSeparator={true} //accepts price thousand like $ 2,456,45
                  prefix={"$"} //dollars or pounds
                />
                <button disabled={processing || disabled || succeeded}>
                  {/* button will be disabled if any {is hapenning} */}
                  <span>
                    {/* if its processing show processing otherwise show 'Buy Now'*/}
                    {processing ? <p>Processing...</p> : "Buy Now"}
                  </span>
                </button>
              </div>

              {/* ERRORS, FOR FAIL SAFE, IF ANYTHING GOES WRONG WITH THE CARD DETAILS */}
              {error && <div>{error}</div>}
              {/* if theres an error only then show <div> with error  */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
