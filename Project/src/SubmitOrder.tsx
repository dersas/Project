import React from "react";
import { useCart } from "./CartContext";

interface SubmitOrderButtonProps {
  onOrderSubmit: () => Promise<void>;
}

const SubmitOrder: React.FC<SubmitOrderButtonProps> = ({ onOrderSubmit }) => {
  const { cartItems } = useCart();

  const handleSubmit = async () => {
    try {
      await onOrderSubmit();
      // You could add additional logic here, like showing a success message
    } catch (error) {
      console.error("Error in order:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <button onClick={handleSubmit} disabled={cartItems.length === 0}>
      Submit
    </button>
  );
};

export default SubmitOrder;
