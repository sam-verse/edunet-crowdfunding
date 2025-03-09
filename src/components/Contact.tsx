import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-gray-900 py-16" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg shadow-md p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-rose-500 focus:ring focus:ring-rose-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-rose-500 focus:ring focus:ring-rose-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Message</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-rose-500 focus:ring focus:ring-rose-200"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-md p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-rose-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white">Address</h3>
                    <p className="text-gray-400">Rajalakshmi Engineering College</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-rose-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white">Email</h3>
                    <p className="text-gray-400">abrahamsamuel562004@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-rose-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white">Phone</h3>
                    <p className="text-gray-400">+91 9345792031</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}