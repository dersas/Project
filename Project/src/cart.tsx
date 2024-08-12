import React, { useState } from "react";
import { useCart } from "./CartContext";
import Header from "./Header";
import Footer from "./Footer";
import CurrencyConverter from "./CurrencyConverter";
import SubmitOrderButton from "./SubmitOrder";

const Cart: React.FC = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    deleteAllCart,
  } = useCart();
  const [selectedCurrency, setSelectedCurrency] = useState<string>("EUR");

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const total = cartItems.reduce(
    (sum, item) => Number((sum + item.price * item.quantity).toFixed(2)),
    0
  );
  const submitOrder = async () => {
    const orderItems = cartItems.map((item) => {
      if (!item._id || !item.quantity || !item.price) {
        console.error("Invalid item:", item);
        throw new Error("Invalid item in cart");
      }
      return {
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      };
    });

    const order = {
      items: orderItems,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText); // Log the error response
        throw new Error(
          `Failed to submit order: ${response.status} ${errorText}`
        );
      }

      const result = await response.json();
      if (result != null || undefined) {
        deleteAllCart();
        alert("Your order has been submited");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div>
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencyChange}
      />
      <main>
        <div className="cart">
          <h2>Your Cart</h2>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="product-item"
              style={{ width: "200px" }}
            >
              <img
                style={{ width: "auto", height: "7rem" }}
                src={item.cover_image}
                alt={item.title}
              />
              <h3>{item.title}</h3>
              <CurrencyConverter
                price={item.price}
                currency="EUR"
                selectedCurrency={selectedCurrency}
              />
              <p>Quantity: {item.quantity}</p>
              <div>
                <button onClick={() => addToCart(item)}>+</button>
                <button onClick={() => removeFromCart(item._id)}>-</button>
                <button onClick={() => deleteFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: </h3>
          <CurrencyConverter
            price={total}
            currency="EUR"
            selectedCurrency={selectedCurrency}
          />
          <SubmitOrderButton onOrderSubmit={submitOrder} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
