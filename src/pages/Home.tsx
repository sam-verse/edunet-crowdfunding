import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import Stats from '../components/Stats';
import WorldMap from '../components/WorldMap';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [campaigns, setCampaigns] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  }

  const backgroundVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Dynamic Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          variants={backgroundVariants}
          animate="animate"
          className="absolute inset-0 bg-gradient-to-br from-rose-500 via-purple-500 to-blue-500 opacity-90"
          style={{
            backgroundSize: '400% 400%'
          }}
        />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20" />
        
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Make a Difference Today
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Join our community of changemakers and create lasting impact through collective giving
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/create"
                className="inline-block bg-white text-rose-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-rose-50 transition-colors transform hover:shadow-xl"
              >
                Start Your Campaign
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -bottom-40 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </motion.div>

      {/* Stats Section */}
      <Stats />

      {/* Campaigns Grid */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Active Campaigns
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link
                to={`/campaign/${campaign.id}`}
                className="block h-full"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={campaign.image_url || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80'}
                      alt={campaign.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {campaign.description}
                    </p>
                    <div className="space-y-4">
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${Math.min(
                              (campaign.current_amount / campaign.goal_amount) * 100,
                              100
                            )}%`
                          }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-900">
                          ${campaign.current_amount.toLocaleString()}
                        </span>
                        <span className="text-gray-500">
                          of ${campaign.goal_amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>
                          {formatDistanceToNow(new Date(campaign.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="text-rose-500 font-semibold"
                        >
                          View Campaign →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* World Map Section */}
      <WorldMap />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}