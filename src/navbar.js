import React, { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Contact", href: "#" }
  ];

  return (
    <div className="relative z-50">
      <nav className="bg-white shadow-md border-b border-gray-200 fixed w-full top-0">
        <div className="flex justify-between h-16">
            <div className="flex items-center pl-0">
              <span className="text-xl font-bold text-blue-600 pl-8">
                Financial Data Filtering App
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8 pr-11">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 pr-9 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden pr-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {mobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:hidden absolute w-full bg-white border-b border-gray-200 shadow-lg`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="h-16"></div>
    </div>
  );
};

export default Navbar;