import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  //history will give us the browser history
  const history = useHistory(); // ADDED LATER FOR PAYMENT PAGE
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2} //two decimal places .00
        value={getBasketTotal(basket)} // total gets passed here
        displayType={"text"} //display type is just plain text
        thousandSeparator={true} //accepts price thousand like $ 2,456,45
        prefix={"$"} //dollars or pounds
      />

      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
        {/* onClick button trigers an event which pushes browser payment page, at any point in the app, history.push can redirect to a certain page*/}
      </button>
    </div>
  );
}

export default Subtotal;
