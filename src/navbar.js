import React, { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Define state

  return (
    <nav className="bg-blue-600">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-white text-lg font-bold">Financial Data Filtering App</div>

        <div className="hidden md:flex space-x-6">
          <a href="#home" className="text-white hover:text-blue-300">
            Home
          </a>
          <a href="#features" className="text-white hover:text-blue-300">
            Features
          </a>
          <a href="#pricing" className="text-white hover:text-blue-300">
            Pricing
          </a>
          <a href="#contact" className="text-white hover:text-blue-300">
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-blue-700`}
      >
        <a href="#home" className="block text-white px-4 py-2 hover:bg-blue-800">
          Home
        </a>
        <a
          href="#features"
          className="block text-white px-4 py-2 hover:bg-blue-800"
        >
          Features
        </a>
        <a
          href="#pricing"
          className="block text-white px-4 py-2 hover:bg-blue-800"
        >
          Pricing
        </a>
        <a
          href="#contact"
          className="block text-white px-4 py-2 hover:bg-blue-800"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
