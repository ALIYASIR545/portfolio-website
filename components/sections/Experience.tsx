'use client'

import { useState, useEffect } from 'react'
import { Briefcase, Calendar, MapPin, Plus, Trash2, Edit2, Check, X, RotateCcw } from 'lucide-react'

const DEFAULT_EXPERIENCES = [
  {
    id: 'exp-1',
    role: 'Full Stack Software Developer',
    company: 'Voltaic.AI',
    period: 'Sep 2025 - Dec 2025',
    location: 'Gulberg 3, Lahore',
    description: 'Developed full-stack applications using Python Flask for backend services and React.js with Next.js for frontend development.',
    skills: ['Python', 'javascript', 'React.js', 'Next.js']
  },
  {
    id: 'exp-2',
    role: 'Research Assistant',
    company: 'KICS UET Lahore',
    period: 'Aug 2024 - Sep 2025',
    location: 'Lahore, Pakistan',
    description: 'Collaborated with NRC Lab on full-stack automation projects and research initiatives. Supported the development of AI-driven tools and prototypes while building reliable data pipelines and scalable data systems.',
    skills: ['Python', 'AI/ML', 'Research', 'Full Stack']
  },
  {
    id: 'exp-3',
    role: 'Project Manager & Full Stack Developer',
    company: 'Sprintx',
    period: 'Jan 2026 - Present',
    location: 'Johar Town 2',
    description: 'Developed full-stack applications using Python Flask for backend services and React.js with Next.js for frontend development. Contributed to AI-driven product development in a fast-paced startup environment.',
    skills: ['Python', 'React.js', 'Next.js', 'AI']
  }
]

export function Experience() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>({})
  const [isAddingNew, setIsAddingNew] = useState(false)

  useEffect(() => {
    const local = localStorage.getItem('portfolio_experiences')
    if (local) {
      try {
        setExperiences(JSON.parse(local))
        setLoading(false)
        return
      } catch (e) {}
    }
    setExperiences(DEFAULT_EXPERIENCES)
    setLoading(false)
  }, [])

  const saveExperiencesToStorage = (updatedList: any[]) => {
    setExperiences(updatedList)
    localStorage.setItem('portfolio_experiences', JSON.stringify(updatedList))
  }

  const handleStartEdit = (exp: any) => {
    setIsAddingNew(false)
    setEditingId(exp.id)
    setEditForm({ ...exp })
  }

  const handleAddExperience = () => {
    const newId = Date.now().toString()
    const newExp = {
      id: newId,
      role: '',
      company: '',
      period: '',
      location: '',
      description: '',
      skills: [],
    }
    setIsAddingNew(true)
    setEditingId(newId)
    setEditForm(newExp)
  }

  const handleSaveEdit = () => {
    let updatedList: any[]
    if (isAddingNew) {
      updatedList = [editForm, ...experiences]
    } else {
      updatedList = experiences.map((exp) => (exp.id === editingId ? editForm : exp))
    }
    saveExperiencesToStorage(updatedList)
    setEditingId(null)
    setIsAddingNew(false)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setIsAddingNew(false)
    setEditForm({})
  }

  const handleDelete = (id: string) => {
    const updatedList = experiences.filter((exp) => exp.id !== id)
    saveExperiencesToStorage(updatedList)
  }

  const handleRestoreDefaults = () => {
    saveExperiencesToStorage(DEFAULT_EXPERIENCES)
  }

  if (loading) return null

  return (
    <section id="experience" className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl font-bold font-mono tracking-widest text-zinc-100 flex items-center gap-3">
          <Briefcase className="text-cyan-400" /> EXPERIENCE
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRestoreDefaults}
            className="font-mono text-xs border border-zinc-800 px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-all flex items-center gap-2 cursor-pointer rounded"
          >
            <RotateCcw size={14} /> RESTORE DEFAULTS
          </button>
          <button
            onClick={handleAddExperience}
            className="font-mono text-xs border border-zinc-700 bg-zinc-900 px-4 py-2 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-950/30 transition-all flex items-center gap-2 cursor-pointer rounded"
          >
            <Plus size={14} /> ADD EXPERIENCE
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {isAddingNew && (
          <div className="p-6 bg-zinc-900/80 border border-cyan-500/50 rounded-lg space-y-4 font-mono text-xs">
            <h4 className="text-cyan-400 font-bold text-sm">Add New Experience</h4>
            <input
              type="text"
              value={editForm.role || ''}
              onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-100 text-sm font-bold rounded focus:border-cyan-400 outline-none"
              placeholder="Role Title"
            />
            <input
              type="text"
              value={editForm.company || ''}
              onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-300 rounded focus:border-cyan-400 outline-none"
              placeholder="Company Name"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={editForm.period || ''}
                onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
                className="bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-300 rounded focus:border-cyan-400 outline-none"
                placeholder="Period (e.g. Jan 2026 - Present)"
              />
              <input
                type="text"
                value={editForm.location || ''}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-300 rounded focus:border-cyan-400 outline-none"
                placeholder="Location"
              />
            </div>
            <textarea
              value={editForm.description || ''}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-300 h-24 rounded focus:border-cyan-400 outline-none"
              placeholder="Role description..."
            />
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">TOOLS / SKILLS (comma-separated)</label>
              <input
                type="text"
                value={Array.isArray(editForm.skills) ? editForm.skills.join(', ') : editForm.skills || ''}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    skills: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-300 rounded focus:border-cyan-400 outline-none"
                placeholder="Python, React.js, Docker"
              />
            </div>
            <div className="flex gap-3 justify-end pt-3 border-t border-zinc-800">
              <button
                onClick={handleSaveEdit}
                className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 px-4 py-2 font-bold flex items-center gap-1.5 cursor-pointer rounded transition-all"
              >
                <Check size={14} /> Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 flex items-center gap-1.5 cursor-pointer rounded transition-all"
              >
                <X size={14} /> Cancel
              </button>
            </div>
          </div>
        )}

        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg relative group hover:border-zinc-700 transition-all"
          >
            {editingId === exp.id && !isAddingNew ? (
              <div className="space-y-4 font-mono text-xs">
                <input
                  type="text"
                  value={editForm.role || ''}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-100 text-sm font-bold rounded focus:border-cyan-400 outline-none"
                  placeholder="Role Title"
                />
                <input
                  type="text"
                  value={editForm.company || ''}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-300 rounded focus:border-cyan-400 outline-none"
                  placeholder="Company"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editForm.period || ''}
                    onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
                    className="bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-300 rounded focus:border-cyan-400 outline-none"
                    placeholder="Period"
                  />
                  <input
                    type="text"
                    value={editForm.location || ''}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-300 rounded focus:border-cyan-400 outline-none"
                    placeholder="Location"
                  />
                </div>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-300 h-24 rounded focus:border-cyan-400 outline-none"
                  placeholder="Description"
                />
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1">TOOLS / SKILLS (comma-separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(editForm.skills) ? editForm.skills.join(', ') : editForm.skills || ''}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        skills: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-700 p-2.5 text-zinc-300 rounded focus:border-cyan-400 outline-none"
                    placeholder="Python, React.js, Docker"
                  />
                </div>
                <div className="flex gap-3 justify-end pt-3 border-t border-zinc-800">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 px-4 py-2 font-bold flex items-center gap-1.5 cursor-pointer rounded transition-all"
                  >
                    <Check size={14} /> Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 flex items-center gap-1.5 cursor-pointer rounded transition-all"
                  >
                    <X size={14} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 font-mono flex items-center gap-2">
                      <Briefcase size={16} className="text-cyan-400" />
                      {exp.role} <span className="text-zinc-500 font-normal">@ {exp.company}</span>
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {exp.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(exp)}
                      className="p-2 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-zinc-700 cursor-pointer rounded"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="p-2 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-950 cursor-pointer rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-zinc-300 mt-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.skills?.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono bg-zinc-950 border border-zinc-800 px-2.5 py-1 text-cyan-400 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export const ExperienceSection = Experience
export default Experience