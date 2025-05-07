import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const Checkout = ({ cart, setCart, setShowCheckout }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
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
      alert('Please fill in all fields.');
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
      <nav className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-4 shadow-lg sticky top-0 z-20">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight">Checkout</h1>
          <button
            onClick={() => setShowCheckout(false)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-900 hover:bg-teal-950 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Design</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto flex-1 p-6">
        {isSubmitted ? (
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 text-center animate-fadeIn">
            <CheckCircle className="w-16 h-16 text-teal-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Purchase Complete!</h2>
            <p className="text-gray-400 mb-6">Thank you for your order, {userDetails.name}!</p>
            <button
              onClick={() => setShowCheckout(false)}
              className="p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Billing Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-700 text-gray-100"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-700 text-gray-100"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Address</label>
                  <textarea
                    name="address"
                    value={userDetails.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-700 text-gray-100"
                    placeholder="123 Main St, City, Country"
                    rows="4"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Order Summary</h2>
              {cart.length === 0 ? (
                <p className="text-gray-400">Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-gray-600 pb-4">
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-600 rounded-lg">
                        {React.createElement(item.icon, { className: 'w-8 h-8 text-teal-400' })}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-100">{item.name}</p>
                        <p className="text-gray-400">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-gray-100">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="border-t border-gray-600 pt-4">
                    <p className="text-lg font-semibold text-gray-100">
                      Total: ${totalPrice.toFixed(2)}
                    </p>
                    <button
                      onClick={handlePurchase}
                      className="w-full p-3 mt-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2"
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

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;