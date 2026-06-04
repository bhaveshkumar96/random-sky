import { useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import "../styles/CartDrawer.css";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

function CartDrawer({
  open,
  setOpen,
  cartItems,
  handleIncrease,
  handleDecrease,
  removeFromCart,
  updateQuantity,
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );
  const deliveryCharge = 25;
  const subTotal = totalPrice;
  const finalTotal = subTotal + deliveryCharge;
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      direction="right"
      size={window.innerWidth <= 767 ? "90vw" : "450px"}
    >
      <div
        style={{
          padding: "20px",
          height: "100%",
          overflowY: "auto",
          background: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: 0 }}>Shopping Cart</h2>

          <span
            style={{
              color: "#666",
            }}
          >
            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {cartItems.length === 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "60px",
            }}
          >
            <h3>Your Cart is Empty</h3>
            <p>Add some products to continue</p>
          </div>
        )}
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <h4 className="cart-item-title">{item.title}</h4>

            <div className="cart-item-body">
              <div className="cart-left">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />

                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <FiMinus />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
              <div className="cart-right">
                <p className="cart-item-price">${item.price}</p>

                <button
                  className="delete-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Delivery Charge</span>
                <span>${deliveryCharge.toFixed(2)}</span>
              </div>

              <hr />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "20px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Checkout
            </button>
          </>
        )}
      </div>
      <button onClick={() => setOpen(false)} className="close-drawer-btn">
        Close
      </button>
    </Drawer>
  );
}

export default CartDrawer;
