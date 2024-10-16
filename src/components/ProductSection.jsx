import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/product/productSlice'; // Adjust the path as needed
import ProductCard from "./ProductCard";

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
};

const ProductsSection = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.product);

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
    const randomProducts = shuffleArray([...products]).slice(0, 8);

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">Explore Our Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {randomProducts.length > 0 ? (
                        randomProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div>No products available.</div>
                    )}
                </div>
                <div className="mt-8 text-center">
                    <button className="bg-red-500 text-white py-2 px-6 rounded-lg">View All Products</button>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
