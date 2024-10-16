import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { RelatedProducts } from "../components";

const ProductDetails = () => {
    const { id } = useParams();
    const idOfPRoduct = id;
    const [product, setProduct] = useState(null);

    const host = 'http://localhost:5000';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${host}/api/v1/product/getproduct/${id}`);
                const data = await response.json();
                setProduct(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id, host]);

    const addToCart = async () => {
        try {
            const response = await fetch(`${host}/api/v1/product/addtocart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify({ productId: id, quantity: 1 }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server responded with:", errorText);
                throw new Error(`Server error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Product added to cart successfully:", data.cartItem);
        } catch (error) {
            console.error("An error occurred while adding the product to the cart:", error);
        }
    };

    if (!product) return <h1 className="text-center">Loading...</h1>;

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Slider {...sliderSettings}>
                        <div>
                            <img src={product.featuredImage} alt="Product" className="w-full mb-4" />
                        </div>
                        <div>
                            <img src={product.subImage1} alt="Thumbnail 1" className="w-full mb-4" />
                        </div>
                        <div>
                            <img src={product.subImage2} alt="Thumbnail 2" className="w-full mb-4" />
                        </div>
                        <div>
                            <img src={product.subImage3} alt="Thumbnail 3" className="w-full mb-4" />
                        </div>
                    </Slider>
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{product.productName}</h1>
                    <p className="text-gray-500">Brand: {product.brand}</p>
                    <p className="text-green-600 font-medium">In Stock: {product.countOfStock}</p>
                    <p className="text-2xl font-bold mt-4">₹{product.price}</p>
                    <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                    <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ipsam sequi provident voluptatum consequatur eum doloremque labore rem commodi eligendi modi deleniti aperiam quisquam iure natus cupiditate harum exercitationem consectetur, aspernatur quos? Dignissimos officiis, quisquam blanditiis mollitia dolorem corporis omnis porro ullam molestias deleniti at architecto quo maxime aut expedita consequatur aspernatur soluta officia veritatis nemo atque reiciendis. Numquam modi repellendus, ipsa iste, quibusdam cupiditate ratione maiores, dignissimos quia dolores voluptatibus iure cumque? Praesentium totam qui quis non, distinctio quas atque excepturi voluptatum nemo. Mollitia quo, eligendi architecto laborum soluta reprehenderit placeat sapiente accusantium. Quia earum numquam ipsum recusandae, molestias hic sed possimus commodi nam, tempore quisquam voluptatem unde maxime architecto, illum explicabo eos temporibus dolores ad ullam incidunt! Perferendis incidunt ut labore est deleniti ipsam illo suscipit molestias nobis officiis, possimus et autem vero enim ullam rerum sequi asperiores quam molestiae! Sequi veniam cum et cupiditate, aut exercitationem nobis.</p>
                    <button
                        onClick={addToCart}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
                    <RelatedProducts idOfPRoduct={idOfPRoduct}/>
        </div>
    );
};

export default ProductDetails;
