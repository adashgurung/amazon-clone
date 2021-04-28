import React from "react";
import "./Product.css";
//import { initialState } from "./reducer";
import { useStateValue } from "./StateProvider";

//using props here //props are reusable
function Product({ id, title, image, price, ratingStar }) {
  const [{ basket }, dispatch] = useStateValue();
  //state is the state of the globel store
  //dispatch allows to shoot action into daatalayer

  //console.log("this is the basket", basket); // this is just debugging step

  const addToBasket = () => {
    // dispatch the item into the datalayer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        ratingStar: ratingStar,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        {/* using props {title} here, getting the props value from Home.js */}

        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>{" "}
          {/* using props {price} here, getting the props value from Home.js */}
        </p>
        <div className="product__ratingStar">
          {/* creating an empty array for the rating */}
          {/* fill using map() function, Home.js ma rating number change garyo vane ⭐️⭐️ change huncha */}
          {Array(
            ratingStar
          ) /* using props {ratingstar} here, getting the props value from Home.js */
            .fill()
            .map((_, i) => (
              <p>⭐️</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket} className="add__button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
