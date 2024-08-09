import Header from "./Header";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import { Product } from "./typing";
import CurrencyConverter from "./CurrencyConverter";

interface CartItem extends Product {
  quantity: number;
}
interface CartProps {
  cartItems: CartItem[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const [cartItemsState, setCartItemsState] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItemsState(cartItems.map((item) => ({ ...item, quantity: 1 })));
  }, [cartItems]);

  const removeFromCart = (itemId: number) => {
    setCartItemsState((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((i) =>
          i._id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prevItems.filter((i) => i._id !== itemId);
      }
    });
  };

  const deleteFromCart = (itemId: number) => {
    setCartItemsState((prevItems) => prevItems.filter((i) => i._id !== itemId));
  };

  const getTotalPrice = () => {
    return cartItemsState.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItemsState.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((data) => (
              <tr key={data._id}>
                <td>{data.title}</td>
                <td>
                  <button onClick={() => removeFromCart(data._id)}>-</button>
                  {data.quantity}
                  <button onClick={() => addToCart(data)}>+</button>
                </td>
                <td>{data.price}</td>
                <td>{(data.price * data.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => deleteFromCart(data._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p>Total: </p>
      <CurrencyConverter
        price={Number(getTotalPrice().toFixed(2))}
        currency=""
      />
    </div>
  );
};

export default Cart;
