import { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Gửi yêu cầu GET đến API "/api/cart" để lấy thông tin giỏ hàng
        const response = await axios.get("/api/cart");
        setCart(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      // Gửi yêu cầu DELETE đến API "/api/cart/:productId" để xóa sản phẩm khỏi giỏ hàng
      const response = await axios.delete(`/api/cart/${productId}`);
      setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.product._id}>
              {item.product.name} x {item.quantity} - ${item.product.price * item.quantity}
              <button onClick={() => handleRemoveFromCart(item.product._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
