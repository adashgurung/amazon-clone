import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const history = useHistory(); // this allows to change the url
  //creating state, this how you write variables on react
  const [email, setEmail] = useState(""); //empty "" sring here
  const [password, setPassword] = useState("");

  //***signIn function
  const signIn = (e) => {
    // this takes an event

    e.preventDefault(); //***important! prevents refresh, no refreshing in react
    auth
      .signInWithEmailAndPassword(email, password) //then give back somekind of auth
      .then((auth) => {
        // if its successful then history.push
        history.push("/"); // redirect to home page
      })
      .catch((error) => alert(error.message));
  };

  //register function
  const register = (e) => {
    //takes event

    e.preventDefault();
    //creating email and password here
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          //if auth is not empty
          //redirectred to home page when creating amazon account
          history.push("/"); // push to home page, need history from reat router dom
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)} //everytime user types in it triggers onChange which give us event (e)
            //e.target.value is somthing user typed in, as user types in it sets email and gets mapped in value={email}
          />

          <h5>Password</h5>
          <input
            type="password" //* by using type password hidden (****)
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={signIn} className="signin__button">
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to <strong>*AMAZON FAKE CLONE*</strong>{" "}
          Conditions of Use & Sale. Please see our Privacy Notice, our Cookies
          Notice and our Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="register__button">
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
