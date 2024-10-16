import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateQuantity } from '../features/product/cartSlice';
import { Error404 } from '../components';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  // State to manage quantities
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    // Initialize quantities state
    const initialQuantities = {};
    cartItems.forEach(item => {
      initialQuantities[item._id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleRemoveFromCart = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };

  const handleUpdateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return; // Prevent quantity from going below 1

    // Update local state
    setQuantities(prev => ({
      ...prev,
      [cartItemId]: quantity
    }));

    // Dispatch action to update the quantity in the Redux store
    dispatch(updateQuantity({ cartItemId, quantity }));
  };

  if (cartItems.length === 0) {
    return <><Error404 error={'Your Cart is Empty...!'} navigate={'/shop'} /></>; // Render Error404 if cart is empty
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2 text-gray-500">
          <Link to="/" className="text-gray-600">Home</Link>
          <span>/</span>
          <p className="font-medium">Cart</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching cart: {error}</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Price</th>
                    <th className="text-left p-4">Quantity</th>
                    <th className="text-left p-4">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="p-4 flex items-center">
                        <img src={item.product.featuredImage} alt={item.product.productName} className="w-16 h-16 object-cover mr-4" />
                        <div>
                          <p className="font-semibold">{item.product.productName}</p>
                          <button className="text-red-500 text-sm" onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                        </div>
                      </td>
                      <td className="p-4">₹{item.product.price}</td>
                      <td className="p-4 flex items-center">
                        <button
                          onClick={() => handleUpdateQuantity(item._id, (quantities[item._id] || 0) - 1)}
                          className="bg-gray-200 text-black px-2 py-1 rounded-md"
                        >
                          -
                        </button>
                        <span className="mx-2">{quantities[item._id] || 0}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item._id, (quantities[item._id] || 0) + 1)}
                          className="bg-gray-200 text-black px-2 py-1 rounded-md"
                        >
                          +
                        </button>
                      </td>
                      <td className="p-4">₹{item.product.price * (quantities[item._id] || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
              <h2 className="font-semibold text-lg">Cart Total</h2>
              <div className="mt-4">
                <div className="flex justify-between text-gray-600">
                  <p>Subtotal:</p>
                  <p>₹{cartItems.reduce((total, item) => total + item.product.price * (quantities[item._id] || 0), 0)}</p>
                </div>
                <div className="flex justify-between text-gray-600 mt-2">
                  <p>Shipping:</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between font-semibold mt-4 text-lg">
                  <p>Total:</p>
                  <p>₹{cartItems.reduce((total, item) => total + item.product.price * (quantities[item._id] || 0), 0)}</p>
                </div>
                <button className="w-full bg-red-500 text-white py-2 rounded-md mt-6">
                  <Link to={"/makeorder"}>Proceed to checkout</Link>
                </button>
              </div>

              {/* Coupon Section */}
              <div className="mt-6">
                <h2 className="font-semibold text-lg">Coupon Code</h2>
                <div className="flex mt-2">
                  <input type="text" className="border p-2 rounded-md w-full" placeholder="Enter coupon" />
                  <button className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md">Apply Coupon</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
