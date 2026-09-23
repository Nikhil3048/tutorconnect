import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Message Sent', 'Thank you for reaching out. We will contact you shortly.', 'success');
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact TutorConnect Support
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Have questions about tutor registration, document verification, or parent inquiry matching?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Info Side */}
          <div className="md:col-span-5 bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white">Get in Touch</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our academic coordinators are available Monday through Saturday from 9:00 AM to 7:00 PM IST.
            </p>

            <div className="space-y-4 pt-4 text-xs">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <span>support@tutorconnect.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Green Park, New Delhi - 110016</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-500">We will respond to {form.email} within 4 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Singh"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="How can we assist you?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
