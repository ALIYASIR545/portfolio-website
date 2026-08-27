'use client'

import { motion } from 'framer-motion'
import { FileText, ExternalLink, BookOpen } from 'lucide-react'

export function Research() {
  const publications = [
    {
      title: 'Predicting the Risk of Cheating in Online Exams',
      journal: 'The International Journal of High-Performance Computing & Networking',
      status: 'Published Article',
      url: 'https://thesesjournal.com/index.php/1/article/view/1838/1382',
      description:
        'A predictive machine learning framework evaluating real-time student behavior metrics and anomaly detection to model and prevent online examination malpractices.',
      tags: ['Machine Learning', 'Behavior Analytics', 'Predictive Modeling', 'EdTech']
    },
    {
      title: 'Early Clinical Sepsis Risk Prediction via Time-Series Analytics',
      journal: 'Healthcare Telemetry & Predictive Analytics Laboratory',
      status: 'Research Prototype',
      url: 'https://github.com/ALIYASIR545',
      description:
        'High-sensitivity classification framework analyzing electronic health record time-series data to detect early onset physiological sepsis indicators before clinical onset.',
      tags: ['Sepsis Analytics', 'Time-Series Data', 'scikit-learn', 'Biomedical AI']
    }
  ]

  return (
    <section id="research" className="py-24 max-w-7xl mx-auto px-6 border-t border-zinc-800">
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-sm text-cyan-400">05 /</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 uppercase">
          Research & Publications
        </h2>
      </div>

      <div className="grid gap-8">
        {publications.map((paper, idx) => (
          <motion.div
            key={paper.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-8 bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/40 rounded-lg transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="space-y-3 max-w-4xl">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="px-2 py-0.5 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded">
                  {paper.status}
                </span>
                <span className="text-zinc-400 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-zinc-500" /> {paper.journal}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-zinc-100 uppercase leading-snug">
                {paper.title}
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed">
                {paper.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {paper.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] px-2 py-0.5 bg-zinc-950 text-zinc-400 border border-zinc-800 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={paper.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs bg-zinc-950 hover:bg-zinc-800 text-zinc-100 border border-zinc-700 px-6 py-4 rounded uppercase font-semibold transition-colors flex items-center gap-2 whitespace-nowrap self-start md:self-center"
            >
              Read Article <ExternalLink size={14} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}