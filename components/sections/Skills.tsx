'use client'

import { useState } from 'react'
import { Code2, Cpu, Wrench, Plus, X } from 'lucide-react'

interface SkillCategory {
  id: string
  title: string
  skills: string[]
  icon: 'code' | 'cpu' | 'wrench'
}

export function Skills() {
  const [categories, setCategories] = useState<SkillCategory[]>([
    {
      id: '1',
      title: 'Programming & DB',
      icon: 'code',
      skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'MongoDB', 'Supabase' , 'Lowcode'],
    },
    {
      id: '2',
      title: 'AI Engineering',
      icon: 'cpu',
      skills: ['NumPy', 'Pandas', 'Scikit-Learn', 'OpenCV', 'RAG', 'Matplotlib', 'Vectorize', 'LLM models'],
    },
    {
      id: '3',
      title: 'Frameworks',
      icon: 'wrench',
      skills: ['React', 'Flask', 'Node.js', 'Next.js', 'FastAPI', 'LangChain', 'Git', 'Docker'],
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSkillsInput, setNewSkillsInput] = useState('')

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const parsedSkills = newSkillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const newCategory: SkillCategory = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      skills: parsedSkills.length > 0 ? parsedSkills : ['New Skill'],
      icon: 'code',
    }

    setCategories([...categories, newCategory])
    setNewTitle('')
    setNewSkillsInput('')
    setIsModalOpen(false)
  }

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />
      case 'wrench':
        return <Wrench className="w-5 h-5 text-sky-400" />
      default:
        return <Code2 className="w-5 h-5 text-sky-400" />
    }
  }

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-6 border-t border-zinc-800/80">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-sky-400 font-semibold tracking-wider">03 /</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100 uppercase">
            Skills & Expertise
          </h2>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group p-7 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
                {renderIcon(cat.icon)}
              </div>
              <h3 className="text-lg font-bold text-zinc-100">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {cat.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 text-xs font-mono text-zinc-300 bg-zinc-800/60 border border-zinc-700/50 rounded-full hover:border-sky-400/50 hover:text-sky-300 hover:bg-sky-950/30 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-zinc-100 mb-4">Add Skill Category</h3>

            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Category Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud & DevOps"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. AWS, Kubernetes, CI/CD"
                  value={newSkillsInput}
                  onChange={(e) => setNewSkillsInput(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-zinc-100 uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold px-4 py-2 rounded-lg text-xs font-mono uppercase transition-all"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}