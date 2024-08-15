import React from 'react'

function Footer() {
  return (
    <footer className="bg-footercolor text-white py-10 ">
      <div className="container mx-auto flex justify-between">
        <div>
          <h2 className="text-lg font-bold">COMPANY</h2>
          <ul className="mt-2 space-y-2">
            <li>About Us</li>
            <li>Legal Information</li>
            <li>Contact Us</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold">HELP CENTER</h2>
          <ul className="mt-2 space-y-2">
            <li>Find a Property</li>
            <li>How To Hostel?</li>
            <li>Why Us?</li>
            <li>FAQs</li>
            <li>Rental Guides</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold">CONTACT INFO</h2>
          <p className="mt-2">Phone: 1234567890</p>
          <p>Email: company@email.com</p>
          <p>Location: 100 Smart Street, LA, USA</p>
          <div className="flex space-x-4 mt-4">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
