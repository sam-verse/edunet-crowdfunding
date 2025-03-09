import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

export default function Campaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = React.useState(null);
  const [donations, setDonations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [donationAmount, setDonationAmount] = React.useState('');
  const [donationMessage, setDonationMessage] = React.useState('');
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetchCampaign();
    fetchDonations();
    checkUser();
  }, [id]);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  }

  async function fetchCampaign() {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCampaign(data);
    } catch (error) {
      console.error('Error fetching campaign:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  async function fetchDonations() {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*, user:user_id(email)')
        .eq('campaign_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  }

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const { error } = await supabase
        .from('donations')
        .insert({
          campaign_id: id,
          user_id: user.id,
          amount: parseFloat(donationAmount),
          message: donationMessage,
        });

      if (error) throw error;

      setDonationAmount('');
      setDonationMessage('');
      fetchCampaign();
      fetchDonations();
    } catch (error) {
      console.error('Error making donation:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!campaign) return null;

  const progress = (campaign.current_amount / campaign.goal_amount) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={campaign.image_url || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80'}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 line-clamp-2">{campaign.title}</h1>
          <p className="text-gray-600 mb-6 line-clamp-4 sm:line-clamp-none">{campaign.description}</p>

          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-rose-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-lg">
              <span className="font-semibold">₹{campaign.current_amount.toLocaleString()}</span>
              <span className="text-gray-600">of ₹{campaign.goal_amount.toLocaleString()}</span>
            </div>

            <form onSubmit={handleDonate} className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Donation Amount (₹)
                </label>
                <input
                  type="number"
                  id="amount"
                  min="1"
                  step="0.01"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring focus:ring-rose-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  value={donationMessage}
                  onChange={(e) => setDonationMessage(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring focus:ring-rose-200"
                  rows={3}
                  maxLength={500}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-colors"
              >
                Donate Now
              </button>
            </form>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Donations</h2>
        <div className="space-y-4">
          {donations.map((donation) => (
            <div key={donation.id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">₹{donation.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{donation.user.email}</p>
                  {donation.message && (
                    <p className="text-gray-600 mt-1 line-clamp-2">{donation.message}</p>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(donation.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}