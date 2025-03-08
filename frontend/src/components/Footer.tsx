import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub, FaYoutube, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-neutral-700 text-gray-400 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            CheckInnPro
          </h2>
          <p className="mt-2 text-sm">
            Making the world a better place through beautiful experiences.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white"><FaFacebookF size={18} /></a>
            <a href="#" className="hover:text-white"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-white"><FaXTwitter size={18} /></a>
            <a href="#" className="hover:text-white"><FaGithub size={18} /></a>
            <a href="#" className="hover:text-white"><FaYoutube size={18} /></a>
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-white font-bold">Solutions</h3>
          <ul className="mt-2 space-y-1">
            <li><Link to="#" className="hover:text-white">Marketing</Link></li>
            <li><Link to="#" className="hover:text-white">Analytics</Link></li>
            <li><Link to="#" className="hover:text-white">Automation</Link></li>
            <li><Link to="#" className="hover:text-white">Commerce</Link></li>
            <li><Link to="#" className="hover:text-white">Insights</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-bold">Support</h3>
          <ul className="mt-2 space-y-1">
            <li><Link to="#" className="hover:text-white">Submit Ticket</Link></li>
            <li><Link to="#" className="hover:text-white">Documentation</Link></li>
            <li><Link to="#" className="hover:text-white">Guides</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-bold">Company</h3>
          <ul className="mt-2 space-y-1">
            <li><Link to="#" className="hover:text-white">About</Link></li>
            <li><Link to="#" className="hover:text-white">Blog</Link></li>
            <li><Link to="#" className="hover:text-white">Jobs</Link></li>
            <li><Link to="#" className="hover:text-white">Press</Link></li>
          </ul>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} CheckInnPro.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
