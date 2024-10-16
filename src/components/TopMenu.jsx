import React, { useState } from 'react';
import { FaBars, FaInfoCircle, FaPhoneAlt, FaServicestack, FaShoppingCart } from 'react-icons/fa';

const TopMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-[300px] md:h-[400px]">
      {/* Sidebar */}
      <aside className={`fixed md:relative top-0 left-0 bg-gray-200 p-4 shadow-lg transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-1/4 h-full`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={toggleSidebar} className="md:hidden">
            <FaBars />
          </button>
        </div>
        <ul className="space-y-2">
          <li>
            <button className="w-full text-left flex items-center" onClick={toggleDropdown}>
              <FaServicestack className="mr-2" /> Options
            </button>
            {isDropdownOpen && (
              <ul className="pl-4 mt-2 space-y-1">
                <li className="flex items-center"><FaInfoCircle className="mr-2" /> Sub-option 1</li>
                <li className="flex items-center"><FaInfoCircle className="mr-2" /> Sub-option 2</li>
              </ul>
            )}
          </li>
          <li className="flex items-center"><FaInfoCircle className="mr-2" /> About</li>
          <li className="flex items-center"><FaPhoneAlt className="mr-2" /> Contact</li>
          <li className="flex items-center"><FaServicestack className="mr-2" /> Services</li>
          <li className="flex items-center"><FaShoppingCart className="mr-2" /> Products</li>
          <li className="flex items-center"><FaShoppingCart className="mr-2" /> Products</li>
          <li className="flex items-center"><FaShoppingCart className="mr-2" /> Products</li>
          <li className="flex items-center"><FaShoppingCart className="mr-2" /> Products</li>
          <li className="flex items-center"><FaShoppingCart className="mr-2" /> Products</li>
          <li className="flex items-center"><FaShoppingCart className="mr-2" /> Products</li>
          <li className="flex items-center"><FaShoppingCart className="mr-2" /> Products</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center md:ml-1/4 h-full">
        <img 
          src="/Homepage/iphone.png" 
          alt="Placeholder" 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default TopMenu;
