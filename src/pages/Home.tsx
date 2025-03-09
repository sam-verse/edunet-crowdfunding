import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import TrustFeatures from '../components/TrustFeatures';
import DonationStats from '../components/DonationStats';
import ImpactAreas from '../components/ImpactAreas';
import WorldMap from '../components/WorldMap';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [campaigns, setCampaigns] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  React.useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('current_amount', { ascending: false })
        .limit(6);

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4"
      >
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-rose-500 rounded-full"
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
                scale: [0, 2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto text-center z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.h1 
              className="text-4xl sm:text-6xl md:text-8xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% auto'
              }}
            >
              Make a Difference Today
            </motion.h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
              Join our community of changemakers and create lasting impact through collective giving
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/create"
                className="inline-block bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-300"
              >
                Start Your Campaign
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <TrustFeatures />
      <ImpactAreas />
      <DonationStats />

      {/* Top Campaigns */}
      <div className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-400"
        >
          Top Campaigns
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
                <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden h-full hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-300">
                  <div className="relative aspect-w-16 aspect-h-9">
                    <img
                      src={campaign.image_url || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80'}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white line-clamp-2">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-2 mb-4">
                      {campaign.description}
                    </p>
                    <div className="space-y-4">
                      <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${Math.min(
                              (campaign.current_amount / campaign.goal_amount) * 100,
                              100
                            )}%`
                          }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-gradient-to-r from-rose-500 to-purple-500 h-full rounded-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-white">
                          ₹{campaign.current_amount.toLocaleString()}
                        </span>
                        <span className="text-gray-400">
                          of ₹{campaign.goal_amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">
                          {formatDistanceToNow(new Date(campaign.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="text-rose-400 font-semibold"
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

      <WorldMap />
      <Contact />
      <Footer />
    </div>
  );
}