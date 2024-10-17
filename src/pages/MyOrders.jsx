import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchProducts } from '../features/product/orderSlice';

const MyOrders = () => {
    const dispatch = useDispatch();
    const { orderItems = [], loading, error, productItems = [] } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchProducts());
    }, [dispatch]);

    const findProductById = (id) => {
        return productItems.find(product => product._id === id);
    };

    const calculateExpectedDeliveryDate = (dateOrdered) => {
        const orderDate = new Date(dateOrdered);
        orderDate.setDate(orderDate.getDate() + 7); // Add 7 days
        return orderDate.toLocaleDateString();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log('Orderitems',orderItems)
    console.log('Products',productItems)
    return (
        <div className="text-white min-h-screen p-4 border-red-500 rounded">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center space-x-2 text-gray-500">
                    <Link to="/" className="text-gray-600">Home</Link>
                    <span>/</span>
                    <p className="font-medium">My Orders</p>
                </div>
            </div>
            <h1 className="text-4xl my-4">My Orders</h1>
            {orderItems.length === 0 ? (
                <p>No orders found</p>
            ) : (
                orderItems.map((order) => (
                    <div key={order._id} className="mb-4 p-4 bg-gray-200 text-black rounded-lg shadow-lg">
                        <h1 className="text-xl">Order ID: <ins>{order._id}</ins></h1>
                        <p>Order Status: <strong className="bg-yellow-300 text-black my-1 p-1 rounded">{order.status || "Pending"}</strong></p>
                        <p>Full Name: {order.fullName}</p>
                        <p>Address: {`${order.address}, ${order.line2}, ${order.city}, ${order.state}, ${order.zip}, ${order.country}`}</p>
                        <p>Phone: {order.phone}</p>
                        <p>Total Price: ₹{order.totalPrice}</p>
                        <p>Payment Mode: {order.paymentMode || "Cash On Delivery"}</p>
                        <p>Coupon Code: {order.couponCode ? order.couponCode : 'N/A'}</p>
                        <p>Date Ordered: {new Date(order.dateOrdered).toLocaleDateString()}</p>
                        <p><ins>Delivered in 7 working days</ins></p>
                        <div className="mt-7 border border-red-500 rounded-md pt-9">
                            {order.orderItems.map((item) => {
                                const product = findProductById(item.product);
                                return (
                                    product && (
                                        <div key={item._id} className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                                            <div className="grid grid-cols-4 w-full">
                                                <div className="col-span-4 sm:col-span-1 mb-3">
                                                    <img src={product.featuredImage} alt={product.productName} className="max-sm:mx-auto object-cover" />
                                                </div>
                                                <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                                                    <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
                                                        {product.productName}
                                                    </h6>
                                                    <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">By: {product.brand}</p>
                                                    <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                                        <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty: {item.quantity}</span>
                                                        <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Price ₹{product.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                                                <div className="flex flex-col justify-center items-start max-sm:items-center">
                                                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Status</p>
                                                    <p className={`font-semibold text-lg leading-8 ${order.status === 'Delivered' ? 'text-green-500' : 'text-red-500'} text-left whitespace-nowrap`}>
                                                        {order.status}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col justify-center items-start max-sm:items-center">
                                                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Delivery Expected by</p>
                                                    <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                                                        {calculateExpectedDeliveryDate(order.dateOrdered)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                        {(order.status === "pending" || order.status === "Pending") && (
                            <div className='my-4 p-4 rounded-lg bg-gray-400'>
                                <p>
                                    <strong>
                                        Only if status is <span className='mx-1 bg-yellow-300 text-black p-1 rounded'>Pending</span> can you cancel the order
                                    </strong>
                                </p>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrders;
