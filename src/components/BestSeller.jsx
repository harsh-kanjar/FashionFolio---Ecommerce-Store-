import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/product/productSlice'; // Adjust the path as needed
import ProductDisplay from "./ProductDisplay";

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
};

function BestSeller() {
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

    // Shuffle the products and limit to the first 4
    const randomProducts = shuffleArray([...products]).slice(0, 4);

    return (
        <div>
            <ProductDisplay
                title="Best Selling Products"
                buttonText="View"
                bottomButton={false}
                products={randomProducts} // Pass the random products to ProductDisplay
            />
        </div>
    );
}

export default BestSeller;
