import React from 'react';
import { Link } from 'react-router-dom';

const ProductDisplay = (props) => {
    const { title, buttonText, bottomButton, products = [] } = props;

    const handleScrollToTop = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    return (
        <section className="bg-gray-100 py-8">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="bg-white p-4 rounded-lg shadow flex flex-col">
                                <img src={product.featuredImage} alt={product.productName} className="mb-4" />
                                <h3 className="font-semibold">{product.productName}</h3>
                                <p className="text-red-500">₹{product.price}</p>
                                <p className="text-gray-600 mt-2" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {product.description.length > 50 ? `${product.description.slice(0, 50)}...` : product.description}
                                </p>
                                <br />
                                <div className="mt-auto"> 
                                    <Link 
                                        to={`/product/${product._id}`} 
                                        className="bg-red-500 text-white hover:bg-black px-4 py-2 rounded mt-2 transition duration-300 ease-in-out transform"
                                        onClick={handleScrollToTop} // Add the scroll to top handler
                                    >
                                        {buttonText}
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No products available.</div>
                    )}
                </div>
            </div>
            {bottomButton && (
                <div className="flex justify-center">
                    <Link to="/shop" className='bg-red-500 text-white px-10 py-2 rounded mt-2' onClick={handleScrollToTop}>
                        View All
                    </Link>
                </div>
            )}
        </section>
    );
};

export default ProductDisplay;
