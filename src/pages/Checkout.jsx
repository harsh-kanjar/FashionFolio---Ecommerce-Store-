import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../features/product/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const deliveryCharges = 100; // Assuming fixed delivery charges

  const [orderDetails, setOrderDetails] = useState({fullName: '',phone: '',address: '',line2: '',city: '', state: '',zip: '',country: '',paymentMode: '',couponCode: '',});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (cartItems.length > 0) {
      calculateTotal(cartItems);
    } else {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const calculateDiscount = (price) => {
    if (price > 5000) return 20;
    if (price > 2000) return 15;
    if (price > 1000) return 10;
    if (price > 500) return 5;
    return 0;
  };

  const calculateTotal = (items) => {
    let total = 0;
    let quantity = 0;
    let discountTotal = 0;

    items.forEach(item => {
      const itemTotalPrice = item.product.price * item.quantity;
      const discountPercent = calculateDiscount(item.product.price);
      const discountAmount = (itemTotalPrice * discountPercent) / 100;
      const discountedPrice = itemTotalPrice - discountAmount;

      total += discountedPrice;
      quantity += item.quantity;
      discountTotal += discountAmount * item.quantity;
    });

    setTotalPrice(total);
    setTotalQuantity(quantity);
    setTotalDiscount(discountTotal);
  };

  const handleChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = async () => {
    const data = {
      ...orderDetails,
      cartItems,
      totalPrice: totalPrice + deliveryCharges,
      totalQuantity,
      totalDiscount,
    };

    console.log("Data being submitted:", data); // Log the data for debugging

    try {
      const response = await fetch(`http://localhost:5000/api/v1/product/makeorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      if (result) {
        console.log('Order successful!');
        navigate('/'); // Redirect to success page
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Failed to submit order:', error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2 text-gray-500">
          <Link to="/account" className="text-gray-600">Account</Link>
          <span>/</span>
          <Link to="/my-account" className="text-gray-600">My Account</Link>
          <span>/</span>
          <Link to="/shop" className="text-gray-600">Product</Link>
          <span>/</span>
          <Link to="/cart" className="text-gray-600">View Cart</Link>
          <span>/</span>
          <p className="font-medium">Checkout</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Billing Details */}
        <div className="w-full md:w-2/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name*</label>
              <input type="text" name="fullName" value={orderDetails.fullName} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number*</label>
              <input type="text" name="phone" value={orderDetails.phone} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Address*</label>
              <input type="text" name="address" value={orderDetails.address} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Apartment, Floor, etc. (optional)</label>
              <input type="text" name="line2" value={orderDetails.line2} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">City*</label>
              <input type="text" name="city" value={orderDetails.city} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium">State*</label>
              <input type="text" name="state" value={orderDetails.state} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Zip Code*</label>
              <input type="text" name="zip" value={orderDetails.zip} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Country*</label>
              <input type="text" name="country" value={orderDetails.country} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" required />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={item.product.featuredImage} alt={item.product.productName} className="w-12 h-12 object-cover mr-4" />
                  <p className="text-sm">{item.product.productName}</p>
                </div>
                <p className="font-semibold">₹{item.product.price}</p>
              </div>
            ))}
            {/* Subtotal and Shipping */}
            <div className="flex justify-between text-gray-600">
              <p>Subtotal:</p>
              <p>₹{Math.ceil(totalPrice)}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Delivery Charges:</p>
              <p>₹{deliveryCharges}</p>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <p>Total:</p>
              <p>₹{Math.ceil(totalPrice + deliveryCharges)}</p>
            </div>

            {/* Payment Method */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Payment Method</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" name="paymentMode" value="Bank" onChange={handleChange} className="mr-2" />
                  <label className="text-sm">Bank</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="paymentMode" value="Cash on Delivery" onChange={handleChange} className="mr-2" />
                  <label className="text-sm">Cash on Delivery</label>
                </div>
              </div>
            </div>

            {/* Submit Order Button */}
            <button onClick={handleSubmitOrder} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
