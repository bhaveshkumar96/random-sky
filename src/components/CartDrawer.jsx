import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

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
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const deliveryCharge = 25;
  const subTotal = totalPrice;
  const finalTotal = subTotal + deliveryCharge;
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      direction="right"
      size="75vh"
    >
      <div
        style={{
          padding: "20px",
          height: "100%",
          overflowY: "auto",
          background: "#fff",
        }}
      >
        {/* Header */}
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
            {cartItems.length} Items
          </span>
        </div>

        {/* Empty State */}
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

        {/* Cart Items */}
        {cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "15px",
              padding: "15px",
              border: "1px solid #eee",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
              }}
            />

            {/* Content */}
            <div style={{ flex: 1 }}>
              <h4
                style={{
                  margin: "0 0 8px",
                  fontSize: "15px",
                }}
              >
                {item.title}
              </h4>

              <p
                style={{
                  margin: "0 0 12px",
                  fontWeight: "bold",
                }}
              >
                ${item.price}
              </p>

              {/* Quantity */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                  }}
                >
                  <FiMinus />
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                  }}
                >
                  <FiPlus />
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginLeft: "auto",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "red",
                    fontSize: "18px",
                  }}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Footer */}
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
    </Drawer>
  );
}

export default CartDrawer;
