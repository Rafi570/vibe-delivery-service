import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { isDark } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      title: 'Lightning Fast Delivery',
      description: 'Get your orders delivered within 30 minutes',
      subtitle: 'Express Service Available',
      image: 'https://illustrations.popsy.co/pink/fast-delivery.svg',
      color: 'from-blue-500 via-blue-600 to-blue-700',
      overlay: 'from-blue-600/60 to-blue-800/60'
    },
    {
      title: 'Real-Time Tracking',
      description: 'Track your delivery every step of the way',
      subtitle: 'Live GPS Updates',
      image: 'https://illustrations.popsy.co/teal/location-tracking.svg',
      color: 'from-green-500 via-green-600 to-green-700',
      overlay: 'from-green-600/60 to-green-800/60'
    },
    {
      title: 'Best Affordable Rates',
      description: 'Competitive pricing without compromising quality',
      subtitle: 'Save More Every Day',
      image: 'https://illustrations.popsy.co/yellow/shopping-cart.svg',
      color: 'from-purple-500 via-purple-600 to-purple-700',
      overlay: 'from-purple-600/60 to-purple-800/60'
    },
    {
      title: '24/7 Customer Support',
      description: 'Round the clock assistance for all your needs',
      subtitle: 'Always Here to Help',
      image: 'https://illustrations.popsy.co/blue/customer-support.svg',
      color: 'from-orange-500 via-orange-600 to-orange-700',
      overlay: 'from-orange-600/60 to-orange-800/60'
    }
  ];

  const cards = [
    { icon: '📦', title: 'Fast Shipping', desc: 'Express delivery within hours' },
    { icon: '🔒', title: 'Secure Payment', desc: 'Safe and encrypted transactions' },
    { icon: '🌍', title: 'Worldwide', desc: 'Deliver to any location' },
    { icon: '⭐', title: 'Quality', desc: 'Premium service guaranteed' },
    { icon: '☎️', title: '24/7 Support', desc: 'Round the clock assistance' },
    { icon: '🎁', title: 'Special Offers', desc: 'Discounts and promotions' },
    { icon: '📱', title: 'Mobile App', desc: 'Easy ordering on the go' },
    { icon: '🚚', title: 'Fleet Management', desc: 'Professional drivers' },
    { icon: '✅', title: 'Quality Check', desc: 'Every item inspected' },
    { icon: '🏆', title: 'Award Winning', desc: 'Trusted by millions' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}
    >
      {/* Modern Banner Slider with Images */}
      <div className={`relative h-[70vh] overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <motion.img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Dark Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].overlay}`}></div>
            
            {/* Content */}
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-center text-white max-w-2xl px-4"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl font-semibold mb-2 opacity-90"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl mb-8 opacity-95"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/orders"
                    className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
                  >
                    Order Now →
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.15, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="absolute left-6 md:left-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 backdrop-blur-md text-white px-4 md:px-6 py-3 md:py-4 rounded-full font-bold text-lg md:text-2xl z-20 transition-all"
        >
          ❮
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.15, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="absolute right-6 md:right-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 backdrop-blur-md text-white px-4 md:px-6 py-3 md:py-4 rounded-full font-bold text-lg md:text-2xl z-20 transition-all"
        >
          ❯
        </motion.button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all backdrop-blur-md ${
                currentSlide === index
                  ? 'bg-white w-12 h-3'
                  : 'bg-white bg-opacity-50 w-3 h-3 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-8 right-8 bg-white bg-opacity-20 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold z-20"
        >
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-7xl mx-auto px-4 py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Vibe Delivery?</h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Experience the best delivery service with premium features
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-6 rounded-2xl shadow-lg transition backdrop-blur-sm ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:shadow-xl'
              }`}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                className="text-5xl mb-4"
              >
                {card.icon}
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={`${isDark ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-white py-20 text-center mt-8`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-4xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-8 opacity-90">Join thousands of satisfied customers today</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/orders"
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
            >
              Start Ordering Now ✨
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
