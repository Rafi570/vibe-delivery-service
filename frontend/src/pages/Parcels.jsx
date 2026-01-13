import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Parcels() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    recipient: '',
    address: '',
    weight: '',
    description: '',
    deliveryType: 'standard'
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_transit: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/parcels');
        const data = await response.json();
        setParcels(data);
      } catch (error) {
        console.error('Failed to fetch parcels:', error);
        // Mock data for demo
        setParcels([
          {
            _id: '1',
            recipient: 'John Doe',
            address: '123 Main St',
            weight: '2.5 kg',
            description: 'Electronics',
            status: 'in_transit',
            deliveryType: 'express',
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            recipient: 'Jane Smith',
            address: '456 Oak Ave',
            weight: '1.2 kg',
            description: 'Documents',
            status: 'delivered',
            deliveryType: 'standard',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          },
          {
            _id: '3',
            recipient: 'Bob Johnson',
            address: '789 Pine Rd',
            weight: '5.0 kg',
            description: 'Furniture',
            status: 'pending',
            deliveryType: 'standard',
            createdAt: new Date(Date.now() - 172800000).toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, []);

  const handleAddParcel = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/parcels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newParcel = await response.json();
      setParcels([...parcels, newParcel]);
      setFormData({
        recipient: '',
        address: '',
        weight: '',
        description: '',
        deliveryType: 'standard'
      });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add parcel:', error);
    }
  };

  const filteredParcels = filter === 'all' 
    ? parcels 
    : parcels.filter(p => p.status === filter);

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

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <p className={isDark ? 'text-gray-400 mb-6' : 'text-gray-600 mb-6'}>
            You need to be logged in to view your parcels
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login Now
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen py-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Parcels</h1>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Manage and track all your deliveries
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              {showForm ? '✕ Cancel' : '+ New Parcel'}
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total', count: parcels.length, icon: '📦' },
              { label: 'Pending', count: parcels.filter(p => p.status === 'pending').length, icon: '⏳' },
              { label: 'In Transit', count: parcels.filter(p => p.status === 'in_transit').length, icon: '🚚' },
              { label: 'Delivered', count: parcels.filter(p => p.status === 'delivered').length, icon: '✅' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add Parcel Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-2xl font-bold mb-6">Create New Parcel</h2>
            <form onSubmit={handleAddParcel} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.recipient}
                  onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border-2 transition ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border-2 transition ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Weight
                </label>
                <input
                  type="text"
                  required
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border-2 transition ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="2.5 kg"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Delivery Type
                </label>
                <select
                  value={formData.deliveryType}
                  onChange={(e) => setFormData({...formData, deliveryType: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border-2 transition ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="standard">Standard (3-5 days)</option>
                  <option value="express">Express (1-2 days)</option>
                  <option value="priority">Priority (Next day)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border-2 transition ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Describe the contents of your parcel"
                  rows="3"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Create Parcel
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Filter Buttons */}
        <motion.div className="mb-8 flex flex-wrap gap-2">
          {['all', 'pending', 'in_transit', 'delivered', 'cancelled'].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full font-semibold transition capitalize ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status === 'in_transit' ? 'In Transit' : status === 'all' ? 'All Parcels' : status}
            </motion.button>
          ))}
        </motion.div>

        {/* Parcels List */}
        {loading ? (
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Loading parcels...</p>
        ) : filteredParcels.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-12 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              No parcels found
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4"
          >
            {filteredParcels.map((parcel) => (
              <motion.div
                key={parcel._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-lg shadow-lg transition ${
                  isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-xl'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{parcel.recipient}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      📍 {parcel.address}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                    isDark ? statusColors[parcel.status] : statusColors[parcel.status]
                  }`}>
                    {parcel.status === 'in_transit' ? 'In Transit' : parcel.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Weight</p>
                    <p className="font-semibold">{parcel.weight}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Type</p>
                    <p className="font-semibold capitalize">{parcel.deliveryType}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Contents</p>
                    <p className="font-semibold">{parcel.description}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date</p>
                    <p className="font-semibold">
                      {new Date(parcel.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    Track
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded-lg font-semibold transition`}
                  >
                    Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
