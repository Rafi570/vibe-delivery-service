import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Orders', path: '/orders' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Blog', path: '#' },
        { name: 'Careers', path: '#' },
        { name: 'Press', path: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '#' },
        { name: 'Contact Support', path: '/contact' },
        { name: 'FAQ', path: '#' },
        { name: 'Terms of Service', path: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '#' },
        { name: 'Terms & Conditions', path: '#' },
        { name: 'Cookie Policy', path: '#' },
        { name: 'Disclaimer', path: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: '📘', name: 'Facebook', url: '#' },
    { icon: '🐦', name: 'Twitter', url: '#' },
    { icon: '📷', name: 'Instagram', url: '#' },
    { icon: '💼', name: 'LinkedIn', url: '#' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className={`${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-900 text-white'}`}>
      {/* Main Footer Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2 mb-4">
              <span className="text-3xl">🚚</span>
              <span>Vibe</span>
            </Link>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-300'} text-sm mb-4`}>
              Fast, reliable, and affordable delivery service for your everyday needs.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.name}
                  className={`text-2xl hover:${isDark ? 'text-blue-400' : 'text-blue-400'} transition`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="text-lg font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      to={link.path}
                      className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'} transition text-sm`}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          variants={itemVariants}
          className={`rounded-lg p-6 mb-8 ${isDark ? 'bg-gray-800' : 'bg-gray-800'}`}
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-300'}>
                Get the latest updates and exclusive offers delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:border-blue-500 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                }`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Divider */}
        <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-700'}`}></div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="pt-8 grid md:grid-cols-3 gap-6 items-center"
        >
          {/* Contact Info */}
          <div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-300'} text-sm mb-2`}>
              📞 +1 (555) 123-4567
            </p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-300'} text-sm`}>
              📧 support@vibedelivery.com
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-300'} text-sm`}>
              © 2024 Vibe Delivery. All rights reserved.
            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex justify-end gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-800'} text-sm font-semibold`}
            >
              💳
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-800'} text-sm font-semibold`}
            >
              🏦
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-800'} text-sm font-semibold`}
            >
              💰
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg z-40 ${
          isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
        } text-white transition`}
        title="Scroll to top"
      >
        ⬆️
      </motion.button>
    </footer>
  );
}
