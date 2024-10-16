import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-gray-600">
            <a href="#" className="text-gray-500">Home</a>
            <span className="mx-2">/</span>
            <a href="#" className="font-medium">About</a>
          </nav>
        </div>

        {/* Our Story Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Text Section */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh.
              Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,560 sellers and 300 brands and serves 3 million customers across the region.
            </p>
            <p className="text-gray-600">
              Exclusive has more than 1 million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer goods to electronics.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2">
            <img src="/about/img.svg" alt="Shopping" className="rounded-lg shadow-lg w-full object-cover" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="text-3xl font-bold">10.5k</div>
            <div className="text-gray-600 mt-2">Sellers active on our site</div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-500">33k</div>
            <div className="text-gray-600 mt-2">Monthly Product Sale</div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="text-3xl font-bold">45.5k</div>
            <div className="text-gray-600 mt-2">Customer active on our site</div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="text-3xl font-bold">25k</div>
            <div className="text-gray-600 mt-2">Annual gross sale on our site</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
