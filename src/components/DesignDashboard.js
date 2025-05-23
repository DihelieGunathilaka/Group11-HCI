import React, { useState, useRef } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  ChevronDown,
  ChevronUp,
  Trash2,
  RotateCcw,
  Save,
  Edit2,
  ShoppingCart,
  X,
  Armchair,
  Table,
  Sofa,
  BookOpen,
  Tv,
  Bed,
  LampFloor,
} from "lucide-react";
import DesignCanvas from "./DesignCanvas";
import Checkout from "./Checkout";
import "../styles/DesignDashboard.css"; // Import the CSS file
import logo from "../assets/logo.png";

const DesignDashboard = ({ designs, setDesigns }) => {
  const predefinedRooms = [
    {
      id: "living-room",
      name: "Living Room",
      width: 12,
      height: 5,
      depth: 12,
      color: "#f0e8d0",
      wallTexture: "darkwood.jpg",
    },
    {
      id: "bedroom",
      name: "Bedroom",
      width: 10,
      height: 4,
      depth: 10,
      color: "#e6e6fa",
      wallTexture: "woodenwall.jpg",
    },
    {
      id: "dining-room",
      name: "Dining Room",
      width: 14,
      height: 6,
      depth: 14,
      color: "#f5f5f5",
      wallTexture: "whitewall.jpg",
    },
    {
      id: "car-garage",
      name: "Car Garage",
      width: 20,
      height: 8,
      depth: 14,
      color: "#f5f5f5",
      wallTexture: "stonewall.jpg",
    },
    {
      id: "new-room",
      name: "New Room",
      width: 20,
      height: 8,
      depth: 14,
      color: "#f5f5f5",
      wallTexture: "stonewall.jpg",
    },
  ];

  const wallTextures = [
    {
      // id: "patterned_concrete",
      id: "leaftexture",
      name: "Leaf Texture Wall",
      file: "leaftexture.jpg",
    },
    {
      id: "graywall",
      name: "Gray Office Wall",
      file: "graywall.jpg",
    },
    {
      id: "stonewall",
      name: "Stone Wall",
      file: "stonewall.jpg",
    },
    {
      id: "woodenwall",
      name: "Light Wood Wall",
      file: "woodenwall.jpg",
    },
    {
      id: "marbleblack",
      name: "Black Marble Wall",
      file: "marbleblack.jpeg",
    },
    {
      id: "darkwood",
      name: "Dark Wood Wall",
      file: "darkwood.jpg",
    },
  ];

  const productCatalog = [
    {
      id: "chair1",
      type: "chair",
      name: "Wooden Chair",
      price: 129.99,
      icon: Armchair,
      image: "chair1.jpg",
      color: "#fff",
      shade: 50,
      scale: 1,
    },
    {
      id: "table1",
      type: "table",
      name: "Dining Table",
      price: 349.99,
      icon: Table,
      color: "#fff",
      shade: 50,
      scale: 1,
    },
    {
      id: "sofa1",
      type: "sofa",
      name: "Sofa",
      price: 799.99,
      icon: Sofa,
      color: "#fff",
      shade: 30,
      scale: 1,
    },
    {
      id: "bookshelf1",
      type: "bookshelf",
      name: "Bookshelf",
      price: 249.99,
      icon: BookOpen,
      color: "#fff",
      shade: 50,
      scale: 1,
    },
    {
      id: "tvstand1",
      type: "tvstand",
      name: "Sleek TV Stand",
      price: 299.99,
      icon: Tv,
      color: "#fff",
      shade: 50,
      scale: 1,
    },
    {
      id: "bed1",
      type: "bed",
      name: "Double Bed",
      price: 649.99,
      icon: Bed,
      color: "#fff",
      shade: 30,
      scale: 1,
    },
    {
      id: "lamp1",
      type: "lamp",
      name: "Floor Lamp",
      price: 179.99,
      icon: LampFloor,
      color: "#fff",
      shade: 70,
      scale: 1,
    },
  ];

  const [room, setRoom] = useState(predefinedRooms[0]);
  const [furniture, setFurniture] = useState([]);
  const [viewMode, setViewMode] = useState("3D");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    room: true,
    catalog: true,
    furnitureSettings: true,
    viewMode: true,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const catalogRef = useRef(null);
  const furnitureSettingsRef = useRef(null);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const validateDimension = (value) => {
    const num = parseFloat(value);
    return isNaN(num) || num <= 0 ? 1 : num;
  };

  const handleRoomChange = (roomId) => {
    const selectedRoom = predefinedRooms.find((r) => r.id === roomId);
    if (selectedRoom) {
      setRoom(selectedRoom);
      setFurniture([]);
    }
  };

  const handleWallTextureChange = (textureFile) => {
    setRoom({ ...room, wallTexture: textureFile });
  };

  const addFurniture = (product) => {
    const furnitureCount = furniture.length;
    const x = (furnitureCount % 3) * 2 - 2;
    const z = Math.floor(furnitureCount / 3) * 2 - 2;
    const newItem = {
      id: Date.now(),
      type: product.type,
      name: product.name,
      price: product.price,
      x,
      z,
      color: product.color,
      shade: product.shade,
      scale: product.scale,
    };
    setFurniture([...furniture, newItem]);
    addToCart(product);
    if (catalogRef.current) {
      catalogRef.current.scrollTo({
        top: catalogRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    if (furnitureSettingsRef.current) {
      furnitureSettingsRef.current.scrollTo({
        top: furnitureSettingsRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateFurniture = (index, updates) => {
    const updatedFurniture = [...furniture];
    updatedFurniture[index] = { ...updatedFurniture[index], ...updates };
    setFurniture(updatedFurniture);
  };

  const saveDesign = () => {
    const design = {
      id: Date.now(),
      room,
      furniture,
      name: `Design ${designs.length + 1} (${room.name})`,
    };
    setDesigns([...designs, design]);
    resetDesign();
  };

  const editDesign = (design) => {
    setRoom(design.room);
    setFurniture(design.furniture);
  };

  const deleteDesign = (id) => {
    setDesigns(designs.filter((d) => d.id !== id));
    setShowDeleteConfirm(null);
  };

  const resetDesign = () => {
    setFurniture([]);
    setRoom(predefinedRooms[0]);
    setViewMode("3D");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (showCheckout) {
    return (
      <Checkout
        cart={cart}
        setCart={setCart}
        setShowCheckout={setShowCheckout}
      />
    );
  }

  // **********************************************************************
  // **********************************************************************
  // **********************************************************************
  // **********************************************************************

  return (
    <div className="custom-container">
      {/* Navbar */}
      <nav className="custom-navbar">
        <div className="custom-container2">
          <img src={logo} alt="Furniture Logo" className="custom-logo" />
          <h1 className="heading">InteraVis Design Studio for Designers</h1>
          <div className="custom-container3">
            <button
              onClick={() => setShowCart(!showCart)}
              className="custom-button"
            >
              <ShoppingCart className="custom-icon" />
              <span className="custom-visible">
                Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </button>
            <button onClick={handleLogout} className="custom-logout-button">
              <LogOut className="custom-icon" />
              <span className="custom-text">Logout</span>
            </button>
          </div>
        </div>
      </nav>
      {/* Navbar End */}

      <div className="containersub">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="custom-card">
            {/* Room Settings */}
            <div>
              <button
                onClick={() => toggleSection("room")}
                className="toggle-button"
              >
                Room Settings
                {expandedSections.room ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedSections.room && (
                <div className="mt-4 space-y-4 animate-fadeIn">
                  <select
                    value={room.id}
                    onChange={(e) => handleRoomChange(e.target.value)}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-700 text-gray-100"
                  >
                    {predefinedRooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={room.wallTexture}
                    onChange={(e) => handleWallTextureChange(e.target.value)}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-700 text-gray-100"
                  >
                    {wallTextures.map((texture) => (
                      <option key={texture.id} value={texture.file}>
                        {texture.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Width (m)"
                    value={room.width}
                    onChange={(e) =>
                      setRoom({
                        ...room,
                        width: validateDimension(e.target.value),
                      })
                    }
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-700 text-gray-100"
                  />
                  <input
                    type="number"
                    placeholder="Height (m)"
                    value={room.height}
                    onChange={(e) =>
                      setRoom({
                        ...room,
                        height: validateDimension(e.target.value),
                      })
                    }
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-700 text-gray-100"
                  />
                  <input
                    type="number"
                    placeholder="Depth (m)"
                    value={room.depth}
                    onChange={(e) =>
                      setRoom({
                        ...room,
                        depth: validateDimension(e.target.value),
                      })
                    }
                    className="w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-700 text-gray-100"
                  />
                  <input
                    type="color"
                    value={room.color}
                    onChange={(e) =>
                      setRoom({ ...room, color: e.target.value })
                    }
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/*************************************************************************/}
            {/*************************************************************************/}
            {/*************************************************************************/}

            {/* Product Catalog */}
            <div>
              <button
                onClick={() => toggleSection("catalog")}
                className="toggle-button"
              >
                Product Catalog
                {expandedSections.catalog ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedSections.catalog && (
                <div
                  className="mt-4 space-y-4 animate-fadeIn max-h-[500px] overflow-y-auto"
                  ref={catalogRef}
                >
                  {productCatalog.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-full h-32 flex items-center justify-center bg-gray-600 rounded-lg mb-2">
                        {React.createElement(product.icon, {
                          className: "w-16 h-16 text-teal-400",
                        })}
                      </div>
                      <p className="font-medium text-gray-100">
                        {product.name}
                      </p>
                      <p className="text-gray-400">
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => addFurniture(product)}
                        className="w-full p-2 mt-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Add to Room & Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/*************************************************************************/}
            {/*************************************************************************/}
            {/*************************************************************************/}

            {/* Furniture Settings */}
            <div>
              <button
                onClick={() => toggleSection("furnitureSettings")}
                className="toggle-button"
              >
                Furniture Settings
                {expandedSections.furnitureSettings ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedSections.furnitureSettings && (
                <div
                  className="mt-4 space-y-4 animate-fadeIn max-h-[500px] overflow-y-auto"
                  ref={furnitureSettingsRef}
                >
                  {furniture.length === 0 ? (
                    <p className="text-gray-400 text-center">
                      No furniture added.
                    </p>
                  ) : (
                    furniture.map((item, index) => (
                      <div
                        key={item.id}
                        className="p-4 bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <p className="capitalize font-medium text-gray-100">
                          {item.name || item.type} #{index + 1}
                        </p>
                        <input
                          type="number"
                          placeholder="X Position (m)"
                          value={item.x || 0}
                          onChange={(e) =>
                            updateFurniture(index, {
                              x: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full p-3 mt-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-700 text-gray-100"
                        />
                        <input
                          type="number"
                          placeholder="Z Position (m)"
                          value={item.z || 0}
                          onChange={(e) =>
                            updateFurniture(index, {
                              z: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full p-3 mt-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-700 text-gray-100"
                        />
                        <input
                          type="number"
                          placeholder="Scale"
                          value={item.scale || 1}
                          min="0.1"
                          step="0.1"
                          onChange={(e) =>
                            updateFurniture(index, {
                              scale: parseFloat(e.target.value) || 1,
                            })
                          }
                          className="w-full p-3 mt-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-gray-700 text-gray-100"
                        />
                        <input
                          type="color"
                          value={item.color}
                          onChange={(e) =>
                            updateFurniture(index, { color: e.target.value })
                          }
                          className="w-full h-12 mt-2 rounded-lg cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={item.shade || 50}
                          onChange={(e) =>
                            updateFurniture(index, {
                              shade: parseFloat(e.target.value),
                            })
                          }
                          className="w-full mt-2 accent-teal-500"
                        />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/*************************************************************************/}
            {/*************************************************************************/}
            {/*************************************************************************/}

            {/* View Mode */}
            <div>
              <button
                onClick={() => toggleSection("viewMode")}
                className="toggle-button"
              >
                View Mode
                {expandedSections.viewMode ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedSections.viewMode && (
                <div className="mt-4 space-y-3 animate-fadeIn">
                  <button
                    onClick={() => setViewMode("2D")}
                    className={`w-full p-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      viewMode === "2D"
                        ? "bg-teal-500 text-white"
                        : "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    }`}
                  >
                    2D View
                  </button>
                  <button
                    onClick={() => setViewMode("3D")}
                    className={`w-full p-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      viewMode === "3D"
                        ? "bg-teal-500 text-white"
                        : "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    }`}
                  >
                    3D View
                  </button>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={saveDesign}
                className="flex-1 p-3 bg-teal-800 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
              <button
                onClick={resetDesign}
                className="flex-1 p-3 bg-rose-800 text-white rounded-lg hover:bg-rose-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          {/* ***********************************************************************/}
          {/* ***********************************************************************/}
          {/* ***********************************************************************/}

          {/* Design Canvas */}

          <div className="lg:col-span-3 rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-black mb-4">
              Design Canvas
            </h2>
            <div className="w-full h-[1500px] rounded-lg overflow-hidden">
              <DesignCanvas
                room={room}
                furniture={furniture}
                viewMode={viewMode}
                onUpdateFurniture={updateFurniture}
              />
            </div>
          </div>
          {/* Design Canvas */}
        </div>

        {/*************************************************************************/}
        {/*************************************************************************/}
        {/*************************************************************************/}

        {/* Saved Changes */}
        <div className="mt-6 rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-black mb-4">
            Saved Designs
          </h2>
          {designs.length === 0 ? (
            <p className="text-gray-600 font-semibold text-center">
              No designs saved yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {designs.map((design) => (
                <div
                  key={design.id}
                  className="p-4 bg-gray-700 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-full h-40 bg-gray-600 rounded-lg mb-3 flex items-center justify-center">
                    <p className="text-gray-400">{design.room.name} Preview</p>
                  </div>
                  <p className="font-medium text-gray-100 truncate">
                    {design.name}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => editDesign(design)}
                      className="flex-1 p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Edit2 className="w-5 h-5" />
                      Edit
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(design.id)}
                      className="flex-1 p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/*************************************************************************/}
        {/*************************************************************************/}

        {/* Cart */}
        {showCart && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gray-800 shadow-xl p-6 overflow-auto z-30 animate-slideIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-100">
                Shopping Cart
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-all duration-300"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg"
                  >
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-600 rounded-lg">
                      {React.createElement(item.icon, {
                        className: "w-8 h-8 text-teal-400",
                      })}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-100">{item.name}</p>
                      <p className="text-gray-400">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 bg-gray-600 rounded hover:bg-gray-500 transition-all duration-300"
                        >
                          -
                        </button>
                        <span className="text-gray-100">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 bg-gray-600 rounded hover:bg-gray-500 transition-all duration-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-rose-700 rounded-full transition-all duration-300"
                    >
                      <Trash2 className="w-5 h-5 text-rose-500" />
                    </button>
                  </div>
                ))}
                <div className="border-t border-gray-600 pt-4">
                  <p className="text-lg font-semibold text-gray-100">
                    Total: ${totalCartPrice.toFixed(2)}
                  </p>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    className="w-full p-3 mt-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2"
                    disabled={cart.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-sm w-full animate-fadeIn">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete this design?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 p-3 bg-gray-600 text-gray-100 rounded-lg hover:bg-gray-500 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteDesign(showDeleteConfirm)}
                  className="flex-1 p-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out;
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-in-out;
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
          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default DesignDashboard;
