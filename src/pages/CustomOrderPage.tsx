import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useProducts } from '../hooks/useProducts';
import { useArtists } from '../hooks/useArtists';
import { Send } from 'lucide-react';

const CustomOrderPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productId = params.get('product') ? Number(params.get('product')) : null;
  const artistId = params.get('artist') ? Number(params.get('artist')) : null;
  
  const { getProductById } = useProducts();
  const { getArtistById, artists } = useArtists();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artistId: artistId || '',
    description: '',
    budget: '',
    timeline: '4-6_weeks',
    attachments: null
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const product = productId ? getProductById(productId) : null;
  const artist = artistId ? getArtistById(artistId) : null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting custom order request:', formData);
    setIsSubmitted(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-2">Request a Custom Order</h1>
        <p className="text-gray-600 mb-8">
          Work directly with our skilled artisans to create something uniquely yours.
        </p>
        
        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Send className="text-green-600" size={24} />
            </div>
            <h2 className="text-2xl font-medium text-green-800 mb-2">Request Submitted!</h2>
            <p className="text-green-700 mb-4">
              Thank you for your custom order request. One of our artisans will contact you within 48 hours to discuss your project.
            </p>
            <p className="text-green-700">
              We've sent a confirmation email to {formData.email}.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">How it works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-cream rounded-lg p-4 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-forest-green text-white rounded-full mb-3">1</div>
                  <h3 className="font-medium mb-2">Submit Your Request</h3>
                  <p className="text-sm text-gray-700">Fill out the form with details about your custom piece.</p>
                </div>
                <div className="bg-cream rounded-lg p-4 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-forest-green text-white rounded-full mb-3">2</div>
                  <h3 className="font-medium mb-2">Connect with an Artisan</h3>
                  <p className="text-sm text-gray-700">We'll match you with the right artisan who will contact you within 48 hours.</p>
                </div>
                <div className="bg-cream rounded-lg p-4 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-forest-green text-white rounded-full mb-3">3</div>
                  <h3 className="font-medium mb-2">Receive Your Creation</h3>
                  <p className="text-sm text-gray-700">Once details are finalized, your custom piece will be crafted with care.</p>
                </div>
              </div>
            </div>
            
            {/* Custom Order Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Order Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium mb-4">Custom Order Details</h3>
                  
                  {/* Artist Selection */}
                  <div className="mb-6">
                    <label htmlFor="artistId" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Artisan {artist && '(Pre-selected)'}
                    </label>
                    <select
                      id="artistId"
                      name="artistId"
                      value={formData.artistId}
                      onChange={handleChange}
                      disabled={artist !== null}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                    >
                      <option value="">Select an artisan (optional)</option>
                      {artists.map(artist => (
                        <option key={artist.id} value={artist.id}>
                          {artist.name} - {artist.specialties.join(', ')}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      Not sure? Leave blank and we'll match you with the right artisan.
                    </p>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Describe your custom piece
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={6}
                      value={product ? `Based on ${product.name}: ${formData.description}` : formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Please provide details about what you're looking for. Include size, materials, colors, intended use, and any other relevant information."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                    />
                  </div>
                  
                  {/* Budget and Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                        Budget Range (USD)
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                      >
                        <option value="">Select a budget range</option>
                        <option value="under_100">Under $100</option>
                        <option value="100_250">$100 - $250</option>
                        <option value="250_500">$250 - $500</option>
                        <option value="500_1000">$500 - $1,000</option>
                        <option value="over_1000">Over $1,000</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-forest-green focus:border-transparent"
                      >
                        <option value="2_weeks">Less than 2 weeks (rush)</option>
                        <option value="2-4_weeks">2-4 weeks</option>
                        <option value="4-6_weeks">4-6 weeks</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* File Upload (not functional in this demo) */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attachments (optional)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-forest-green hover:text-forest-green-dark focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Upload sketches, inspiration images, or reference materials
                    </p>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="border-t border-gray-200 pt-6">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-forest-green text-white font-medium rounded-md hover:bg-forest-green-dark transition-colors"
                  >
                    Submit Custom Order Request
                  </button>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    By submitting, you agree to our Terms of Service and Custom Order Policy.
                  </p>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CustomOrderPage;