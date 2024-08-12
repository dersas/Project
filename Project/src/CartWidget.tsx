import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

const CartWidget: React.FC = () => {
  const { cartItems } = useCart();

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/cart">
      <div style={{ position: "relative" }}>
        <img
          src="https://pngimg.com/d/bookshelf_PNG107078.png"
          alt="The image for the cart"
          style={{ width: "30px", height: "auto" }}
        ></img>
        <div
          style={{
            position: "absolute",
            right: "-5px",
            bottom: "-5px",
            color: "black",
            height: "20px",
            width: "20px",
            backgroundColor: "white",
            display: "flex",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {itemCount}
        </div>
      </div>
    </Link>
  );
};

export default CartWidget;
