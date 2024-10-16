import React from 'react';

const Footer1 = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
        {/* Free and Fast Delivery */}
        <div className="text-center mb-6 md:mb-0">
          <div className="flex justify-center mb-3">
            <i className="fas fa-truck text-3xl text-gray-600"></i>
          </div>
          <h4 className="font-semibold text-lg">FREE AND FAST DELIVERY</h4>
          <p className="text-gray-500">Free delivery for all orders over $140</p>
        </div>
        
        {/* 24/7 Customer Service */}
        <div className="text-center mb-6 md:mb-0">
          <div className="flex justify-center mb-3">
            <i className="fas fa-headset text-3xl text-gray-600"></i>
          </div>
          <h4 className="font-semibold text-lg">24/7 CUSTOMER SERVICE</h4>
          <p className="text-gray-500">Friendly 24/7 customer support</p>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <i className="fas fa-shield-alt text-3xl text-gray-600"></i>
          </div>
          <h4 className="font-semibold text-lg">MONEY BACK GUARANTEE</h4>
          <p className="text-gray-500">We return money within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default Footer1;
