import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/product/productSlice'; // Adjust the path as needed
import ProductCard from "../components/ProductCard";

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
};

const Shop = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.product);
    const [searchTerm, setSearchTerm] = useState('')

    const filteredProducts = products.filter(product => {
        const searchLower = searchTerm.toLowerCase();

        // Check if productName, description, or any keyword matches the searchTerm
        return (
            product.productName.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
            product.category.toLowerCase().includes(searchLower)
        );
    });
    // Fetch products on component mount
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message if there's an error
    }

    // Shuffle the products and limit to the first 8
    const randomProducts = shuffleArray([...filteredProducts]);


    return (
        <>
            <section className="py-8">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center space-x-2 text-gray-500">
                    <Link to="/" className="text-gray-600">Home</Link>
                    <span>/</span>
                    <p className="font-medium">Shop</p>
                </div>
            </div>
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold mb-6 text-center">Shop</h2>
                    {/* Search */}
                    <div className="flex px-4 py-3 rounded-md border-2 border-red-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                            className="fill-red-500 mr-3 rotate-90">
                            <path
                                d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                            </path>
                        </svg>
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Shirt combo..." className="w-full outline-none bg-transparent text-gray-600 text-sm" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {randomProducts.length > 0 ? (
                            randomProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <div>No products available.</div>
                        )}
                    </div>

                </div>
            </section>
        </>
    );
};

export default Shop;
