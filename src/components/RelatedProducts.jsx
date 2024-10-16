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

function RelatedProducts(props) {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.product);
    const {idOfPRoduct} = props
    

    console.log('from related products',idOfPRoduct)

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


    const filteredProduct = products.filter(product => product._id === idOfPRoduct)[0];
    const searchTerm = filteredProduct.productName.slice(0,4)
    const targetedProducts = products.filter(product => {
        const searchLower = searchTerm.toLowerCase();
    
        // Check if productName, description, or any keyword matches the searchTerm
        return (
            product.productName.toLowerCase().includes(searchLower) 
        );
    });

    console.log('search teram',searchTerm)
    console.log('from filter product this is a filter prduct',filteredProduct.productName)
    console.log('targeted',targetedProducts)

    // Shuffle the products and limit to the first 4
    const randomProducts = shuffleArray([...targetedProducts]).slice(0,8);
    const randomProducts2 = shuffleArray([...products]).slice(0,4);

    return (
        <div>
            <ProductDisplay
                title="Relavents"
                buttonText="View"
                bottomButton={false}
                products={randomProducts} // Pass the random products to ProductDisplay
            />
            <ProductDisplay
                title="Few Suggests"
                buttonText="View"
                bottomButton={false}
                products={randomProducts2} // Pass the random products to ProductDisplay
            />
        </div>
    );
}

export default RelatedProducts;
