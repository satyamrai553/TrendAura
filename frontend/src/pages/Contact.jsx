import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // You can replace this with your API call for submitting the contact form
      // const response = await submitContactForm(formData);
      setSuccess("Your message has been sent successfully!");
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-background_primary py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-text_primary text-center mb-6">
          Contact Us
        </h2>
        <p className="text-lg text-text_primary text-center mb-12">
          We’d love to hear from you! Fill out the form below, and we will get back to you as soon as possible.
        </p>
        
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {success && (
            <div className="mb-4 text-green-600">{success}</div>
          )}
          {error && (
            <div className="mb-4 text-red-600">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-text_primary font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-text_primary font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-text_primary font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="6"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-300"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
