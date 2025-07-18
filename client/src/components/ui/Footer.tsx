import { Link } from "wouter";
import { 
  FaFacebookF, 
  FaTiktok,
  FaInstagram, 
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0057a6] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <img src="/assets/Logo.jpg" alt="Megahand Logo" className="h-10" />
            </div>
            <p className="text-gray-400 mb-6">Your trusted source for quality European clothing for the whole family.</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/megahand.az/?locale=az_AZ" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaFacebookF />
              </a>
              <a href="https://www.tiktok.com/@megahandsumqayit" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaTiktok />
              </a>
              <a href="https://www.instagram.com/megahandsumqayit/?hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/showcase/megahand-sumqay%C4%B1t/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/interesting" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Interesting
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li className="pt-4 border-t border-gray-700 mt-2">
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                <span className="text-gray-400">Badalbayli Street, Sumqayit 5001, Azerbaijan</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-gray-400" />
                <span className="text-gray-400">m3gahand@gmail.com</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-gray-400" />
                <span className="text-gray-400">+99450 277 07 20</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Megahand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
