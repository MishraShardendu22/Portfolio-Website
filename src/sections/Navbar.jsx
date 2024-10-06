/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { navLinks } from "../constants/index.js";
import { Menu, X, Github, Home, User, Briefcase, Mail } from "lucide-react";
import axios from 'axios';

const getIcon = (name) => {
  switch (name.toLowerCase()) {
    case 'home':
      return <Home size={20} className="mr-2" />;
    case 'about':
      return <User size={20} className="mr-2" />;
    case 'work':
      return <Briefcase size={20} className="mr-2" />;
    case 'contact':
      return <Mail size={20} className="mr-2" />;
    default:
      return null;
  }
};

const NavItems = ({ onClick = () => {} }) => {
  return (
    <ul className="flex flex-col sm:flex-row sm:space-x-6">
      {navLinks.map((item) => (
        <li key={item.id}>
          <a
            href={item.href} // Changed 'to' to 'href'
            onClick={onClick}
            className="flex items-center text-gray-300 hover:text-yellow-500 transition-colors py-2 px-3 rounded-md hover:bg-gray-700 text-sm font-medium"
          >
            {getIcon(item.name)}
            {item.name}
          </a>
        </li>
      ))}
      <li>
        <a
          href="https://github.com/MishraShardendu22"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-300 hover:text-yellow-500 transition-colors py-2 px-3 rounded-md hover:bg-gray-700 text-sm font-medium"
        >
          <Github size={20} className="mr-2" />
          Github
        </a>
      </li>
    </ul>
  );
};

NavItems.propTypes = {
  onClick: PropTypes.func,
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get("https://api.github.com/users/MishraShardendu22");
        if (response.data && response.data.avatar_url) {
          setProfileImage(response.data.avatar_url); // Set profile image
        } else {
          console.error("No avatar URL found in the response.");
        }
      } catch (error) {
        console.error("Error fetching Github profile image:", error);
      }
    };

    fetchProfileImage();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center cursor-pointer" onClick={() => window.open('https://www.linkedin.com/in/shardendumishra22/', '_blank')}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-6 h-6 rounded-full mr-2"
              />
            ) : (
              <div className="w-6 h-6 rounded-full mr-2 bg-gray-500" /> // Placeholder if the image is not loaded
            )}
            <span className="text-white font-bold text-xl hover:text-yellow-500 transition-colors">
              Shardendu Mishra
            </span>
          </div>

          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white p-2 rounded-md sm:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden sm:flex">
            <NavItems />
          </nav>
        </div>
      </div>

      <div className={`sm:hidden ${isOpen ? 'max-h-screen' : 'max-h-0'} transition-all duration-300 overflow-hidden bg-gray-800`}>
        <nav className="px-4 pt-2 pb-4 space-y-1">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
