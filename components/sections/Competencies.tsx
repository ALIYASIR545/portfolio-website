'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    category: 'Full-Stack Development',
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS']
  },
  {
    category: 'Backend & Databases',
    skills: ['Python', 'Flask', 'FastAPI', 'PostgreSQL', 'MongoDB', 'SQL', 'Prisma ORM', 'REST APIs']
  },
  {
    category: 'AI & Data Engineering',
    skills: ['PyTorch', 'CNN', 'LLAMA 3.1', 'Pandas', 'NumPy', 'Scikit-learn', 'VectorDB', 'Data Pipelines']
  },
  {
    category: 'Tools & Cloud Integrations',
    skills: ['Stripe', 'AWS S3', 'Mailchimp', 'AdPlugg', 'Git/GitHub', 'Docker', 'Linux', 'Postman']
  }
]

export function Competencies() {
  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-6 border-t border-border">
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-sm text-accent">02 /</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary uppercase">Core Competencies</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-8 bg-surface border border-border"
          >
            <h3 className="font-mono text-sm text-accent uppercase tracking-wider mb-6">// {cat.category}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs px-3 py-1.5 bg-background border border-border text-secondary hover:text-primary hover:border-accent transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}