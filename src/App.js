import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header"; // Header.js is component always starts with capital
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js"; // STRIPE LIBRARY PAYMENT
import { Elements } from "@stripe/react-stripe-js"; //STRIPE LIBRARY PAYMENT

//PROMISE loads stripe and store it in promise
const promise = loadStripe(
  //no need to hide- this is public key
  "pk_test_51HhjoHB3oRcFFDwOaHnEYh0oPm427MHeDsfiqwzzsmBAUDi4OBFxnUaRbgLCZ5Ekm1xMugZomqbU8aHcRWcmDn7C00TYJ6jvid"
);

function App() {
  //**CONTEXT API CODE to pull data from datalayer
  const [{ basket }, dispatch] = useStateValue();
  //**CREATING LISTENER WHICH IS GONNA KEEP TRACK WHOS SIGNED IN**
  // will only run once when app component loads
  useEffect(() => {
    //useEffect use arrow function

    //as soon as the app loads it listens/observer to everything  when login or log out
    auth.onAuthStateChanged((authUser) => {
      //whenever the authentication changes it gives the aunthenticated user
      console.log("THIS USER IS >>", authUser); //just for debugging

      if (authUser) {
        //if there is a user logged in or user was logged in.

        dispatch({
          // dispatch an object
          type: "SET_USER", // type of dispatch and action was user
          user: authUser, // action.user connected from reducer.js
          // then send user , user if simply auth that comes back from firebase
        });
        //** with fire base authentication,
        //** even if you refresh the page it will log you back in with your username if you were already logged in from before
      } else {
        //the user is logged out
        dispatch({
          //dispatch an object
          type: "SET_USER",
          user: null, // send user back to null , so nobody is logged in
        });
      }
    });
  }, []);

  return (
    // the two __ is part of BEM convention
    <Router>
      <div className="app">
        {/* <Header /> */}
        {/* put Header above <switch> to show on all pages, nice lil trick! */}
        {/* calling Header component, return/render method is displaying on the browser */}

        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/login">
            {/* takes you to /login page*/}
            <Login />
          </Route>

          <Route path="/checkout">
            {/* takes you to /checkout page */}
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            {/* takes you to /payment page */}
            <Header />

            {/* **ADDED LATER ** pass in stripe and inside stripe pass in promise */}
            <Elements stripe={promise}>
              {/* WRAP <Payment /> with <Elements/> */}
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
            {/* / is default takes you back to home page, but make sure its always on the bottom to work */}
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
