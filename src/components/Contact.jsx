import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader2, User, MessageSquare } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function Contact() {
  const revealRef = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [statusMessage, setStatusMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error message when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: "172ddcc9-76e7-4419-b02a-40b45f8989c3",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setStatusMessage("Thank you! Your message has been sent successfully.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.message || "Failed to send message. Please try again later.");
      }
    } catch (err) {
      console.error("Form submission error: ", err);
      setStatus('error');
      setStatusMessage("An error occurred. Please check your internet connection and try again.");
    }
  };

  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const box = btn.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    btn.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
  };

  const handleMagneticLeave = (e) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-header reveal" ref={revealRef}>
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title gradient-text">Let's Connect</h2>
        </div>

        <div className="contact-layout">
          {/* Info Card Column */}
          <div className="contact-info-col reveal reveal-delay-1" ref={revealRef}>
            <div className="glass-card contact-info-card">
              <h3 className="contact-info-title">Let's Connect</h3>
              <p className="contact-info-text">
                I am always open to discussing projects, collaborations, internships, and new opportunities.
              </p>

              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="detail-icon-wrapper">
                    <Mail size={20} />
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Email Me</span>
                    <a href="mailto:ashvinichourasia@gmail.com" className="detail-value">
                      ashvinichourasia@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-col reveal reveal-delay-2" ref={revealRef}>
            <div className="glass-card form-glass-card">
              {status === 'success' ? (
                <div className="form-status-screen success" role="alert">
                  <CheckCircle size={64} className="status-icon-glow" />
                  <h3 className="status-heading">Message Sent!</h3>
                  <p className="status-text">{statusMessage}</p>
                  <button 
                    onClick={() => setStatus('idle')} 
                    className="btn btn-primary btn-status-reset"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  {status === 'error' && (
                    <div className="form-error-alert" role="alert">
                      <AlertCircle size={20} />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <div className="input-wrapper">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                        placeholder="John Doe"
                        disabled={status === 'loading'}
                        required
                      />
                    </div>
                    {errors.name && <span className="error-message" id="name-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <div className="input-wrapper">
                      <Mail size={18} className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                        placeholder="john@example.com"
                        disabled={status === 'loading'}
                        required
                      />
                    </div>
                    {errors.email && <span className="error-message" id="email-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <div className="input-wrapper textarea-wrapper">
                      <MessageSquare size={18} className="input-icon textarea-icon" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
                        placeholder="Hi Ashvini, I'd like to talk about..."
                        rows={5}
                        disabled={status === 'loading'}
                        required
                      ></textarea>
                    </div>
                    {errors.message && <span className="error-message" id="message-error">{errors.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary form-submit-btn shine-overlay magnetic-item"
                    disabled={status === 'loading'}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="spin-animate" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
