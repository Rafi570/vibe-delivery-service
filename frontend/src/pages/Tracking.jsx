import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Tracking() {
  const { isDark } = useTheme();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className={`text-center py-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>Loading...</p>;
  if (!order) return <p className={`text-center py-16 text-red-600 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>Order not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`min-h-screen max-w-2xl mx-auto px-4 py-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      <h1 className="text-3xl font-bold mb-6">Track Order</h1>
      
      <motion.div
        className={`p-8 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        whileHover={{ y: -5 }}
      >
        <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}><strong>Order ID:</strong> {order._id}</p>
        <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}><strong>Item:</strong> {order.item}</p>
        <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}><strong>Address:</strong> {order.address}</p>
        <p className="text-xl font-semibold text-blue-600">
          Status: <span className="uppercase">{order.status}</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
