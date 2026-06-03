import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useCart } from "../hooks/useCart";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import CartDrawer from "./CartDrawer";
const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { addToCart, cartItems, removeFromCart, updateQuantity } = useCart();
  const [cartItemsCount, setCartItemsCount] = useState(cartItems.length || 0);
  const [cartItem, setCartItems] = useState(cartItems);
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  // const removeFromCart = (id) => {
  //   setCartItems((prev) => prev.filter((item) => item.id !== id));
  // };
  return (
    <nav
      style={{
        height: "70px",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          fontSize: "22px",
          fontWeight: "700",
          cursor: "pointer",
          flex: 1, // Pushes cart to the far right
        }}
        onClick={() => navigate("/")}
      >
        Suprem Gear
      </div>

      <div
        style={{
          position: "relative",
          cursor: "pointer",
        }}
      >
        <FaShoppingCart size={24} onClick={() => setOpen(true)} />

        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-10px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#111",
            color: "#fff",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {cartItems.length}
        </span>
      </div>
      <CartDrawer
        open={open}
        setOpen={setOpen}
        cartItems={cartItems}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </nav>
  );
};
export default Navbar;
