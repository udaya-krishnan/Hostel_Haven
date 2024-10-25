import React from 'react';

function Footer() {
  return (
    <footer className="bg-footercolor text-white py-10">
      <div className="container mx-auto px-4">
        {/* Flex container for larger screens, stacking for smaller */}
        <div className="flex flex-col lg:flex-row justify-between lg:space-x-8 space-y-8 lg:space-y-0">
          
          {/* Company Info */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-lg font-bold">COMPANY</h2>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Legal Information</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Blog</a></li>
            </ul>
          </div>

          {/* Help Center */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-lg font-bold">HELP CENTER</h2>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="hover:text-gray-300">Find a Property</a></li>
              <li><a href="#" className="hover:text-gray-300">How To Hostel?</a></li>
              <li><a href="#" className="hover:text-gray-300">Why Us?</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQs</a></li>
              <li><a href="#" className="hover:text-gray-300">Rental Guides</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-lg font-bold">CONTACT INFO</h2>
            <p className="mt-2">Phone: 1234567890</p>
            <p>Email: company@email.com</p>
            <p>Location: 100 Smart Street, LA, USA</p>
            <div className="flex flex-wrap space-x-4 mt-4">
              <a href="#" className="hover:text-gray-300"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-gray-300"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-gray-300"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8 text-sm text-gray-400">
          &copy; 2024 Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;