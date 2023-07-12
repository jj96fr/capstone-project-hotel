import React from 'react';
import LogoWhite from '../assets/img/logo-white.svg';
import { FaTwitter, FaFacebook, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-primary py-12'>
      <div className='container mx-auto text-white flex justify-between items-start'>
        {/* Logo */}
        <a href='/'>
          <img src={LogoWhite} alt='' />
        </a>

        {/* Link ai social media */}
        <div className='text-white flex justify-between ml-4 items-center'>
          <a href='https://www.facebook.com/il-tuo-account-facebook' target='_blank' rel='noopener noreferrer'>
            <FaFacebook size={32} />
          </a>
          <a href='https://www.instagram.com/il-tuo-account-instagram' target='_blank' rel='noopener noreferrer'>
            <FaInstagram size={32} />
          </a>
          <a href='https://www.twitter.com/il-tuo-account-twitter' target='_blank' rel='noopener noreferrer'>
            <FaTwitter size={32} />
          </a>
        </div>
      </div>
      <div className='container mx-auto text-white flex justify-center items-center flex-wrap '>
        <div className='flex items-center mr-4'>
          <FaPhone />
          <span className='ml-2'>Phone:</span>
          <a href='tel:+1234567890' className='ml-1'>
            +1 (234) 567-890
          </a>
        </div>
        <div className='flex items-center mt-2'>
          <FaEnvelope />
          <span className='ml-2'>Email:</span>
          <a href='mailto:info@example.com' className='ml-1'>
            info@example.com
          </a>
        </div>
      </div>
      <div className='container mx-auto text-white flex justify-center items-start'>
        <small>&copy; 2023. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
