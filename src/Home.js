import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="home__background"
        />
        <div className="home__row">
          {/* use all props from product.js to call them */}
          <Product
            id="1"
            title="Apple Airpods Pro"
            price={209.99}
            image="https://images-na.ssl-images-amazon.com/images/I/71zny7BTRlL._AC_SL1500_.jpg"
            ratingStar={5}
          />
          <Product
            id="2"
            title="Apple iMac (27-Inch Retina 5K Display, 3.0GHz 6-Core 8th-Generation Intel Core i7 Processor, 2TB)"
            price={1299.99}
            image="https://images-na.ssl-images-amazon.com/images/I/810RI8O1jJL._AC_SL1500_.jpg"
            ratingStar={4}
          />
        </div>
        {/* index.css ma gayera background-color add garnuparcha to make the backgound grey */}
        <div className="home__row">
          <Product
            id="3"
            title="Proscenic T21 Air Fryer Oil Free with APP, 5.5L/1700W XL Chip Fryer Oven with Digital Display, Alexa & Google Home Voice Control"
            price={87.99}
            image="https://images-na.ssl-images-amazon.com/images/I/61YqksPS4OL._AC_SL1000_.jpg"
            ratingStar={1}
          />
          <Product
            id="4"
            title="RYACO Borosilicate Glass Water Bottle 550ml BPA-Free Leak Proof Ideal for School Home Office Travel Sport Yoga Gym Hot Cold Drinks"
            price={9.99}
            image="https://images-na.ssl-images-amazon.com/images/I/61x-e-p9CAL._AC_SL1200_.jpg"
            ratingStar={2}
          />
          <Product
            id="5"
            title="Airpod Cases, Wireless Charging Case Waterproof Protective Cover Silicone Cases Skin with Keychain Compatible with Airpods 2 & 1, Sand Pink"
            price={4.09}
            image="https://images-na.ssl-images-amazon.com/images/I/61Md-DU4lIL._AC_SL1300_.jpg"
            ratingStar={3}
          />
        </div>

        <div className="home__row">
          <Product
            id="6"
            title="Samsung LC43J890DKUXEN 43 Curved Ultra Wide LED Monitor - Super UltraWide 3840 x 1200, 120Hz, HDMI, Displayport, USB-C, Speakers, Dark Blue"
            price={788.99}
            image="https://images-na.ssl-images-amazon.com/images/I/71AxbYOJ8pL._AC_SL1500_.jpg"
            ratingStar={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
