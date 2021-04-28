import React from "react";
import "./Header.css";
import "./Home.js";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  //**USER ADDED LATER */
  const [{ basket, user }, dispatch] = useStateValue(); //pull data from datalayer

  const handleAuthentication = () => {
    if (user) {
      //if theres a user logged in
      auth.signOut(); //sign out
    }
  };

  return (
    <div className="header">
      <Link to="/">
        {/* click on amazon image to go back to home page */}
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        {/* by clicking on sign in takes you to login page */}
        <Link to={!user && "/login"}>
          {/*** !user ADDED LATER-> IF THERES NO USER ONLY THEN PUSH TO LOGIN PAGE */}
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? "Guest" : user.email}
              {/*   Hello {user?.email || "Guest"} */}
              {/* if there is no user signed in show guest, if signed in then show email address */}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
              {/* if the user is logged in- show Sign Out otherwise show Sign In */}
            </span>
          </div>
        </Link>

        {/* add Link to return to orders page */}
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header__optionLineTwo">Basket</span>
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
              {/* basket(?).length will handle the error if any occurs*/}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
