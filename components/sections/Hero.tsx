'use client'

import { motion } from 'framer-motion'
import { ArrowDownRight, FileText, Send } from 'lucide-react'

export function Hero() {
  return (
    <section id="hero" className="min-h-screen pt-32 pb-20 flex flex-col justify-between max-w-7xl mx-auto px-6">
      <div className="mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs text-sky-400 tracking-widest mb-6"
        >
          // FULL-STACK ENGINEER & AI ARCHITECT
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold text-zinc-100 tracking-tight uppercase leading-[0.9]"
        >
          YASIR ALI SHAH
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-3xl text-zinc-400 mt-6 font-light max-w-3xl"
        >
          Full Stack Software Developer & AI Engineer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-zinc-400 max-w-2xl mt-6 text-sm sm:text-base leading-relaxed"
        >
          Building scalable web systems, data engineering pipelines, and custom AI applications with modern React, Next.js, Python, and machine learning frameworks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <a
            href="#projects"
            className="bg-zinc-100 text-zinc-950 font-mono text-xs px-6 py-4 uppercase font-semibold hover:bg-sky-400 transition-colors flex items-center gap-2"
          >
            View Projects <ArrowDownRight size={16} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="border border-zinc-800 text-zinc-100 font-mono text-xs px-6 py-4 uppercase hover:border-sky-400 hover:text-sky-400 transition-colors flex items-center gap-2"
          >
            Download Resume <FileText size={16} />
          </a>
          <a
            href="#contact"
            className="border border-zinc-800 text-zinc-400 font-mono text-xs px-6 py-4 uppercase hover:text-zinc-100 hover:border-zinc-100 transition-colors flex items-center gap-2"
          >
            Contact Me <Send size={16} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-16 border-t border-zinc-800 font-mono text-xs"
      >
        <div>
          <span className="text-zinc-500 block mb-1">LOCATION</span>
          <span className="text-zinc-100 font-medium">Pakistan</span>
        </div>
        <div>
          <span className="text-zinc-500 block mb-1">SPECIALIZATION</span>
          <span className="text-zinc-100 font-medium">Full-Stack / AI / Systems</span>
        </div>
        <div>
          <span className="text-zinc-500 block mb-1">CURRENT STATUS</span>
          <span className="text-zinc-100 font-medium">MS Software Engineering</span>
        </div>
        <div>
          <span className="text-zinc-500 block mb-1">AVAILABILITY</span>
          <span className="text-sky-400 font-medium">Open for Opportunities</span>
        </div>
      </motion.div>
    </section>
  )
}