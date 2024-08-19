import React, { useContext } from "react";
import "./PlaceOrder.css";
import { useSelector } from "react-redux";

const PlaceOrder = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const foodList = useSelector((state) => state.products.foodList);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="Name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Detail address" />
        <div className="multi-fields">
          <input type="text" placeholder="Provinsi" />
          <input type="text" placeholder="Kabupaten" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Kecamatan" />
          <input type="text" placeholder="Kelurahan" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
