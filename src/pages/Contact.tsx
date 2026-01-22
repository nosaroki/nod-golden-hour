import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GlitterBackground } from '@/components/GlitterBackground';
import { NodSmile } from '@/components/NodSmile';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  subject: z.string().trim().min(1, 'Required').max(200),
  message: z.string().trim().min(1, 'Required').max(2000),
});

type FormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0] as keyof FormData;
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      setStatus('idle');
      return;
    }

    // Simulate form submission (in production, connect to an API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-screen">
      <GlitterBackground />
      <Navbar />
      
      <main className="relative z-10 pt-32 md:pt-40 section-padding">
        <div className="content-container">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <NodSmile size={60} color="orange" className="mx-auto mb-8" />
              <h1 className="text-editorial-lg mb-4">{t('contact.title')}</h1>
              <p className="text-body-lg text-muted-foreground">{t('contact.subtitle')}</p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.name')}
                  className="input-premium"
                />
                {errors.name && <p className="text-destructive text-sm mt-2">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.email')}
                  className="input-premium"
                />
                {errors.email && <p className="text-destructive text-sm mt-2">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact.subject')}
                  className="input-premium"
                />
                {errors.subject && <p className="text-destructive text-sm mt-2">{errors.subject}</p>}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.message')}
                  rows={6}
                  className="input-premium resize-none"
                />
                {errors.message && <p className="text-destructive text-sm mt-2">{errors.message}</p>}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-premium w-full md:w-auto"
                >
                  <span>
                    {status === 'loading' ? '...' : t('contact.send')}
                  </span>
                </button>
              </div>

              {status === 'success' && (
                <motion.p
                  className="text-primary text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {t('contact.success')}
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  className="text-destructive text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {t('contact.error')}
                </motion.p>
              )}
            </motion.form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
