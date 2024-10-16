import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/signup");
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-red-500 to-red-700 shadow-md"><Link to={'/'}>FashionFolio</Link></div>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li className='cursor-pointer px-2 py-1 hover:shadow-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform rounded'>
               <Link to={"/"}>Home</Link>
            </li>
            <li className='cursor-pointer px-2 py-1 hover:shadow-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform rounded'>
              <Link to={"/shop"}>Shop now</Link>
            </li>
            <li className='cursor-pointer px-2 py-1 hover:shadow-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform rounded'>
              <Link to={"/contact"}>Contact</Link>
            </li>
            <li className='cursor-pointer px-2 py-1 hover:shadow-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform rounded'>
              <Link to={"/about"}>About Us</Link>
            </li>
            <li className='cursor-pointer px-2 py-1 hover:shadow-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform rounded'>
              <Link to={"/cart"}>Cart</Link>
            </li>
            {
              localStorage.getItem('token') ? 
              <li className='cursor-pointer px-2 py-1 hover:shadow-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform rounded'>
              <Link to={"/myorders"}>My Orders</Link>
            </li>
            :
            <li className='cursor-pointer px-2 py-1 hover:shadow-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform rounded'>
              <Link to={"/signup"}>My Orders</Link>
            </li>
            }
            
          </ul>
        </nav>
        <div className="text-sm hidden md:block">
          {isLoggedIn ? (
            
            <Link to={"/signup"} className='bg-black text-white px-4 py-2 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform rounded' onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to={"/signup"} className='bg-black text-white px-4 py-2 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform rounded'>
              <span>Login</span> / <span>Signup</span>
            </Link>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <button className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <ul className="flex flex-col space-y-2 p-4">
            <li className='cursor-pointer'><Link to={"/"} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li className='cursor-pointer'><Link to={"/contact"} onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            <li className='cursor-pointer'><Link to={"/shop"} onClick={() => setIsMenuOpen(false)}>Shop now</Link></li>
            <li className='cursor-pointer'><Link to={"/aboutus"} onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
            <li className='cursor-pointer'><Link to={"/cart"} onClick={() => setIsMenuOpen(false)}>Cart</Link></li>
            <li className='cursor-pointer'><Link to={"/myorders"} onClick={() => setIsMenuOpen(false)}>My Orders</Link></li>
            <li className='cursor-pointer'>
              {isLoggedIn ? (
                <Link to={"/signup"} onClick={handleLogout}>Logout</Link>
              ) : (
                <Link to={"/signup"}>Login / Signup</Link>
              )}
            </li>
          </ul>
          <div className="text-sm">Up to 10% off Voucher</div>
        </div>
      )}
    </header>
  );
};

export default Header;
