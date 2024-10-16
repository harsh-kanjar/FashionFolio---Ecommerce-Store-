import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../features/product/cartSlice'; // Adjust the path as needed
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const cartItems = useSelector(state => state.cart.cartItems);

  const handleCartClick = async (productId) => {
    const cartItem = cartItems.find(item => item.product === productId);

    if (cartItem) {
      const userConfirmed = window.confirm("Are you sure you want to remove it from the cart?");
      if (userConfirmed) {
        await dispatch(removeFromCart(cartItem._id));
      }
    } else {
      await dispatch(addToCart({ productId, quantity: 1 }));
    }
  };

  const handleViewClick = () => {
    navigate(`/product/${product._id}`); // Navigate to product details
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg relative transition-transform duration-300">
      <img src={product.featuredImage} alt={product.productName} className="w-full mb-4" />
      <h3 className="text-lg font-semibold">{product.productName}</h3>
      <p className="text-red-500">₹{product.price}</p>
      <p className="text-gray-500">{product.rating} stars</p>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button onClick={() => handleCartClick(product._id)} className="bg-black text-white hover:bg-red-500 py-1 px-2 transition duration-300 ease-in-out rounded-md">
          Add To Cart
        </button>
        <button onClick={handleViewClick} className="bg-gray-400 text-black hover:bg-gray-300 w-15 py-1 px-3 transition duration-300 ease-in-out rounded-md">
          <Link to={`/productdetails/${product._id}`} >View</Link>
        </button>
      </div>

      {product.isNew && (
        <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">NEW</span>
      )}
    </div>
  );
};

export default ProductCard;
