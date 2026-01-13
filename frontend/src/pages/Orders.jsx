import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Orders() {
  const { isDark } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-7xl mx-auto px-4 py-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}
    >
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>
      
      {loading ? (
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No orders found</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-lg shadow-md border-l-4 border-blue-600 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h3 className="text-lg font-semibold">{order.item}</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Status: {order.status}</p>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Delivery: {order.address}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
