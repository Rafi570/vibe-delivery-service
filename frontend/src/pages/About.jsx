import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function About() {
  const { isDark } = useTheme();

  const teamMembers = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', icon: '👩‍💼' },
    { name: 'Mike Chen', role: 'CTO', icon: '👨‍💻' },
    { name: 'Emily Davis', role: 'Operations Manager', icon: '👩‍💼' },
    { name: 'Alex Rodriguez', role: 'Customer Success', icon: '👨‍💼' }
  ];

  const values = [
    { icon: '⚡', title: 'Speed', desc: 'Fast and reliable delivery every time' },
    { icon: '🔒', title: 'Trust', desc: 'Your parcels are safe with us' },
    { icon: '💚', title: 'Care', desc: 'We care about every customer' },
    { icon: '🌱', title: 'Sustainability', desc: 'Eco-friendly delivery solutions' }
  ];

  const stats = [
    { number: '50K+', label: 'Deliveries Completed' },
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Cities Covered' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-5xl font-bold mb-4"
          >
            About Vibe Delivery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90"
          >
            Delivering excellence, one parcel at a time
          </motion.p>
        </div>
      </motion.div>

      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={`max-w-7xl mx-auto px-4 py-20`}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Vibe Delivery was founded in 2020 with a simple mission: to make package delivery faster, safer, and more affordable for everyone.
            </p>
            <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              What started as a small team delivering packages in a single city has grown into a nationwide delivery network serving thousands of customers every day.
            </p>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              We believe that great delivery service should be accessible to everyone, which is why we're committed to competitive pricing without compromising on quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🚚
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={`${isDark ? 'bg-gray-800' : 'bg-white'} py-16`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.h3
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className="text-4xl font-bold text-blue-600 mb-2"
                >
                  {stat.number}
                </motion.h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-20"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Core Values
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`p-6 rounded-lg text-center ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                className="text-5xl mb-4"
              >
                {value.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {value.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={`${isDark ? 'bg-gray-800' : 'bg-white'} py-20`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Meet Our Team
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-lg text-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-20 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6"
        >
          Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
        >
          To revolutionize the delivery industry by providing fast, affordable, and reliable 
          service to every customer. We're committed to innovation, sustainability, and 
          building long-term relationships with our customers and partners.
        </motion.p>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={`${isDark ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-white py-20 text-center`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-4xl font-bold mb-4">Join Our Community</h3>
          <p className="text-lg mb-8 opacity-90">
            Experience the Vibe Delivery difference today
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
          >
            Get Started Now →
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
