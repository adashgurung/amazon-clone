import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  //using props, give the {order}
  return (
    //7:52:00
    <div className="order">
      <h2>Order</h2>
      {/* moment is a library for passing timestamp  */}
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      {/* months date year, hour am/pm */}

      <p className="order__id">
        <small>{order.id}</small>
        {/* order id */}
      </p>
      {/* 7:54:00 */}
      {/* retrieve from saved order component and map through all item and return =>*/}
      {order.data.basket?.map((item) => (
        /* reusing the CheckoutProduct component */
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          ratingStar={item.ratingStar}
          hideButton //*** Add this later to hideButton from orders 8:01:00
        />
      ))}
      <CurrencyFormat
        // renders out some text with value
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3> //with some value
        )}
        decimalScale={2} //two decimal places .00
        value={order.data.amount / 100} // total gets passed here ** /100 using subunits
        displayType={"text"} //display type is just plain text
        thousandSeparator={true} //accepts price thousand like $ 2,456,45
        prefix={"$"} //dollars or pounds
      />
    </div>
  );
}

export default Order;
