import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-blue-600'} text-white shadow-lg sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">🚚</span>
            <span className="hidden sm:inline">Vibe Delivery</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link 
              to="/" 
              className={`hover:${isDark ? 'text-gray-300' : 'text-blue-200'} transition font-semibold`}
            >
              Home
            </Link>
            <Link 
              to="/orders" 
              className={`hover:${isDark ? 'text-gray-300' : 'text-blue-200'} transition font-semibold`}
            >
              Orders
            </Link>
            <Link 
              to="/parcels" 
              className={`hover:${isDark ? 'text-gray-300' : 'text-blue-200'} transition font-semibold`}
            >
              Parcels
            </Link>
            <Link 
              to="/about" 
              className={`hover:${isDark ? 'text-gray-300' : 'text-blue-200'} transition font-semibold`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`hover:${isDark ? 'text-gray-300' : 'text-blue-200'} transition font-semibold`}
            >
              Contact
            </Link>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-blue-500'} transition`}
              title="Toggle dark mode"
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-blue-500'} transition flex items-center gap-2`}
                >
                  👤 {user.name}
                </motion.button>

                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                      isDark ? 'bg-gray-800' : 'bg-white text-gray-900'
                    }`}
                  >
                    <div className="p-4 border-b border-gray-600">
                      <p className="font-semibold">{user.name}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:${isDark ? 'bg-gray-700' : 'bg-gray-100'} transition`}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-400'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-blue-500'}`}
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden mt-4 pb-4 space-y-2`}
          >
            <Link 
              to="/" 
              className="block py-2 hover:bg-blue-700 rounded px-4 transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/orders" 
              className="block py-2 hover:bg-blue-700 rounded px-4 transition"
              onClick={() => setMenuOpen(false)}
            >
              Orders
            </Link>
            <Link 
              to="/parcels" 
              className="block py-2 hover:bg-blue-700 rounded px-4 transition"
              onClick={() => setMenuOpen(false)}
            >
              Parcels
            </Link>
            <Link 
              to="/about" 
              className="block py-2 hover:bg-blue-700 rounded px-4 transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 hover:bg-blue-700 rounded px-4 transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left py-2 hover:bg-blue-700 rounded px-4 transition"
              >
                Logout ({user.name})
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 hover:bg-blue-700 rounded px-4 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 hover:bg-blue-700 rounded px-4 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
