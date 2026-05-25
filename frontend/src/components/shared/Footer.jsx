import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#0F172A] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <h2 className="text-3xl font-bold">
              Job<span className="text-[#6A38C2]">Portal</span>
            </h2>

            <p className="text-gray-400 mt-4 text-sm leading-6">
              Find your dream job with ease. Explore thousands of job
              opportunities from top companies around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-[#6A38C2] cursor-pointer transition">
                Home
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">
                Jobs
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">
                Browse
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">
                Contact
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-[#6A38C2] cursor-pointer transition">
                Frontend Developer
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">
                Backend Developer
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">
                Full Stack Developer
              </li>
              <li className="hover:text-[#6A38C2] cursor-pointer transition">
                Data Science
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>

            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-full hover:bg-[#6A38C2] transition cursor-pointer">
                <FaFacebook size={20} />
              </div>

              <div className="bg-white/10 p-3 rounded-full hover:bg-[#6A38C2] transition cursor-pointer">
                <FaInstagram size={20} />
              </div>

              <div className="bg-white/10 p-3 rounded-full hover:bg-[#6A38C2] transition cursor-pointer">
                <FaLinkedin size={20} />
              </div>

              <div className="bg-white/10 p-3 rounded-full hover:bg-[#6A38C2] transition cursor-pointer">
                <FaGithub size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400 text-sm">
          © 2026 JobPortal. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
