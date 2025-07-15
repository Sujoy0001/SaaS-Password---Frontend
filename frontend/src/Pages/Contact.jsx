import React, { useState } from 'react';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowSmallRightIcon
} from '@heroicons/react/24/outline';

const ContactPage = () => {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const FORM_URL = import.meta.env.VITE_FORMSPREE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch(FORM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-full text-gray-100">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">Contact Us</h1>
          <p className="text-gray-300">
            Reach out with questions, feedback, or partnership opportunities.
          </p>
        </div>

        {/* Contact Form */}
        <div className="p-6 max-w-3xl mx-auto">

          {status === 'success' && (
            <div className="bg-green-900/30 border border-green-800 rounded-lg p-3 mb-5 flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-5 flex items-center">
              <ExclamationCircleIcon className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
              <span>Error submitting your message. Please try again.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                placeholder="Username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center px-6 py-3 bg-gray-300 text-black font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-70"
            >
              {status === 'submitting' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="p-6 mt-8">
          <h2 className="text-3xl font-semibold mb-5 flex items-center">
            Contact Information
          </h2>
          
          <div className="space-y-6 lg:flex gap-5 justify-between items-center">
            <div className="flex items-center">
              <div className="bg-zinc-800 p-2 rounded-lg mr-4">
                <EnvelopeIcon className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-300">sujoycode999@gamil.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-zinc-800 p-2 rounded-lg mr-4">
                <PhoneIcon className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-300">+91 6294178990</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-zinc-800 p-2 rounded-lg mr-4">
                <MapPinIcon className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-300">Durgapur, West Bengal</p>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default ContactPage;