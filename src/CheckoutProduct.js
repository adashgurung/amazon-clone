import React from "react";
import "./CheckoutProduct.css";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, image, title, price, ratingStar, hideButton }) {
  //passing props here

  const [{ basket }, dispatch] = useStateValue();
  //imp! use this code to pull infomation or change/remove with (dispatch)

  const removeFromBasket = () => {
    //remove item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET", // dispatch action with type REMOVE_FROMBASKET attached to it
      id: id, //also pass along item id, to find the id in the basket and remove from basket

      //youtube time 3:07:29 8 hrs
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>

        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="checkoutProduct__ratingStar">
          {Array(ratingStar)
            .fill()
            .map((_, i) => (
              <p>⭐️</p>
            ))}
        </div>
        {/*HIDE BUTTON on ORDERS PAGE 8:01:50*/}
        {/* Only render this <button> if its not hidden */}
        {!hideButton && ( //if its not hidden then render <button>
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
