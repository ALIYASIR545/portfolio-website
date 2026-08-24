'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Code, Globe } from 'lucide-react'

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '0111eec8-86b9-49b2-a072-8875cdd55956',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const result = await res.json()
      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 border-t border-border">
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-sm text-accent">03 /</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary uppercase">Get In Touch</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-secondary text-base leading-relaxed">
            Interested in starting a project, discussing technical architecture, or exploring software engineering opportunities? Reach out directly.
          </p>

          <div className="space-y-4 font-mono text-sm pt-4">
            <a href="mailto:afridiyasir47@gmail.com" className="flex items-center gap-4 text-secondary hover:text-accent transition-colors p-4 bg-surface border border-border">
              <Mail className="w-5 h-5 text-accent" />
              <span>afridiyasir47@gmail.com</span>
            </a>
            <a href="https://github.com/ALIYASIR545" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-secondary hover:text-accent transition-colors p-4 bg-surface border border-border">
              <Code className="w-5 h-5 text-accent" />
              <span>github.com/ALIYASIR545</span>
            </a>
            <a href="https://linkedin.com/in/yasir-ali-afridi-5332161b6" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-secondary hover:text-accent transition-colors p-4 bg-surface border border-border">
              <Globe className="w-5 h-5 text-accent" />
              <span>linkedin.com/in/yasir-ali-afridi</span>
            </a>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-surface border border-border p-8 space-y-6"
        >
          <div>
            <label className="block font-mono text-xs text-secondary mb-2">NAME</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-secondary mb-2">EMAIL</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-secondary mb-2">SUBJECT</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
              placeholder="Project Inquiry"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-secondary mb-2">MESSAGE</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 text-sm text-primary focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Your message here..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-primary text-background font-mono text-xs py-4 font-semibold uppercase hover:bg-accent transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'} <Send size={14} />
          </button>

          {status === 'success' && (
            <p className="font-mono text-xs text-accent text-center">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="font-mono text-xs text-red-500 text-center">Failed to send message. Please try again.</p>
          )}
        </motion.form>
      </div>
    </section>
  )
}