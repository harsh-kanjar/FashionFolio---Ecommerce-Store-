import React from 'react';

const Footer2 = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Exclusive Section */}
        <div>
          <h4 className="font-bold text-lg mb-4">Exclusive</h4>
          <p className="mb-2">Subscribe</p>
          <p className="text-gray-400 mb-4">Get 10% off your first order</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-black p-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-red-500 px-4 py-2 rounded-r-md">→</button>
          </form>
        </div>

        {/* Support Section */}
        <div>
          <h4 className="font-bold text-lg mb-4">Support</h4>
          <p>111 Bijoy sarani, Dhaka,</p>
          <p>DH 1515, Bangladesh.</p>
          <p className="mt-2">exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        {/* Account Section */}
        <div>
          <h4 className="font-bold text-lg mb-4">Account</h4>
          <ul>
            <li><a href="#" className="hover:text-red-500">My Account</a></li>
            <li><a href="#" className="hover:text-red-500">Login / Register</a></li>
            <li><a href="#" className="hover:text-red-500">Cart</a></li>
            <li><a href="#" className="hover:text-red-500">Wishlist</a></li>
            <li><a href="#" className="hover:text-red-500">Shop</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Link</h4>
          <ul>
            <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-red-500">Terms Of Use</a></li>
            <li><a href="#" className="hover:text-red-500">FAQ</a></li>
            <li><a href="#" className="hover:text-red-500">Contact</a></li>
          </ul>
        </div>

        {/* Download App Section */}
        <div>
          <h4 className="font-bold text-lg mb-4">Download App</h4>
          <p className="mb-4">Save $3 with App New User Only</p>
          <div className="flex space-x-2 mb-4">
            <img src="path/to/google-play.png" alt="Google Play" className="w-24" />
            <img src="path/to/app-store.png" alt="App Store" className="w-24" />
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-red-500"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-red-500"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-red-500"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-red-500"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-8">
        <p>&copy; Copyright Rimel 2022. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer2;
