import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // we need this to PULL the data from data base
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
  //pulling {user} from react context API
  const [{ basket, user }, dispatch] = useStateValue();
  //from stateprovider.js but files are made inside reducer.js

  //creating state for storing all the orderss
  const [orders, setOrders] = useState([]); //give value of empty array []

  //when the <Orders/> component loads fire off useEffect hook
  useEffect(() => {
    if (user) {
      //if user exists then only do below
      //TIME 7:42:32 ***//pulling orders from database
      db.collection("users") //accessing users collection from firestore db
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc") //show/orderby by date created, show in descending order(recent one at the top)
        //onSnapshot function, updates in real time response
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      //else set orders to empty array
      setOrders([]);
    }
  }, [user]); //make it only run once,// if you keep the [] empty it will only run once
  //but we are using if (user) varible, need to be dependent
  return (
    //7:50:00
    <div className="orders">
      <h1>Your Orders</h1>
      {/* this will be like order_container */}
      <div className="orders__order">
        {/* map through all the order and return <Order/> component */}
        {orders?.map((order) => (
          <Order order={order} />
          //its taking a prop and pass all the order inside it
        ))}
      </div>
    </div>
  );
}

export default Orders;
