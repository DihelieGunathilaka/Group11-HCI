import React, { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import "../styles/Checkout.css";

const Checkout = ({ cart, setCart, setShowCheckout }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePurchase = () => {
    if (userDetails.name && userDetails.email && userDetails.address) {
      setIsSubmitted(true);
      setCart([]);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="checkout-container">
      <nav className="checkout-nav">
        <div className="checkout-nav-content">
          <h1 className="text-2xl font-extrabold tracking-tight">Checkout</h1>
          <button
            onClick={() => setShowCheckout(false)}
            className="checkout-back-button"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Design</span>
          </button>
        </div>
      </nav>

      <div className="checkout-content">
        {isSubmitted ? (
          <div className="checkout-card text-center animate-fadeIn">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2>Purchase Complete!</h2>
            <p>Thank you for your order, {userDetails.name}!</p>
            <button
              onClick={() => setShowCheckout(false)}
              className="checkout-button mt-4"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="checkout-card">
              <h2>Billing Details</h2>
              <div className="space-y-4">
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    className="checkout-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="checkout-input"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={userDetails.address}
                    onChange={handleInputChange}
                    className="checkout-textarea"
                    placeholder="123 Main St, City, Country"
                    rows="4"
                  />
                </div>
              </div>
            </div>

            <div className="checkout-card">
              <h2>Order Summary</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="checkout-order-item">
                      <div className="checkout-icon-box">
                        {React.createElement(item.icon, {
                          className: "checkout-icon",
                        })}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p>
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="checkout-summary">
                    <p>Total: ${totalPrice.toFixed(2)}</p>
                    <button
                      onClick={handlePurchase}
                      className="checkout-button"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
