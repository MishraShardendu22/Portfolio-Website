/* eslint-disable no-unused-vars */
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate environment variables
    if (!import.meta.env.VITE_APP_EMAILJS_SERVICE_ID || !import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID || !import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY) {
      console.error('Missing EmailJS environment variables.');
      toast.error('Service is not properly configured. Please try again later.');
      setLoading(false);
      return;
    }

    // Debugging environment variables
    console.log(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID);
    console.log(import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID);
    console.log(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);

    await emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Shardendu Mishra',
          from_email: form.email,
          to_email: 'shardendumishra01@gmail.com', // Corrected typo
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          toast.success('Thank you for your message 😃'); // Success toast

          setTimeout(() => {
            setForm({
              name: '',
              email: '',
              message: '',
            });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error('EmailJS Error:', error.text);
          toast.error("I didn't receive your message 😢"); // Error toast
        }
      );
  };

  return (
    <section className="c-space my-20" id="contact">
      <Toaster /> {/* Add the Toaster component here */}

      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />

        <div className="contact-container">
          <h3 className="head-text">Let`s talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you’re looking to build a new website, improve your existing platform, or bring a unique project to
            life, I’m here to help.
          </p>

          <form onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Ex: Shardendu Mishra"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Ex: shardendumishra01@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Write your thoughts here..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
