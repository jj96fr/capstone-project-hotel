import React from "react";
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      <div className="flex items-center mb-4">
        <FaPhone className="mr-2" />
        <span>+1 123 456 7890</span>
      </div>
      <div className="flex items-center mb-4">
        <FaEnvelope className="mr-2" />
        <span>info@example.com</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;