'use client'

import { useState, useEffect } from 'react'
import { Briefcase, Calendar, MapPin, Plus, Trash2, Edit2, Check, X } from 'lucide-react'

export function ExperienceSection() {
  const [data, setData] = useState<{ experiences: any[]; profilePic: string }>({
    experiences: [],
    profilePic: '',
  })
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>({})

  // Fetch portfolio data from JSON backend on load
  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((resData) => {
        // Ensure experiences is always an array even if missing in JSON response
        setData({
          ...resData,
          experiences: Array.isArray(resData?.experiences) ? resData.experiences : [],
        })
        setLoading(false)
      })
      .catch((err) => {
        console.error('Fetch error:', err)
        setLoading(false)
      })
  }, [])

  // POST updated state to JSON file on disk
  const savePortfolioData = async (updatedData: typeof data) => {
    setData(updatedData)
    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })
    } catch (err) {
      console.error('Save error:', err)
    }
  }

  const handleStartEdit = (exp: any) => {
    setEditingId(exp.id)
    setEditForm(exp)
  }

  const handleSaveEdit = () => {
    const updatedList = (data.experiences || []).map((exp) =>
      exp.id === editingId ? editForm : exp
    )
    savePortfolioData({ ...data, experiences: updatedList })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    const updatedList = (data.experiences || []).filter((exp) => exp.id !== id)
    savePortfolioData({ ...data, experiences: updatedList })
  }

  const handleAddExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      role: 'New Role',
      company: 'Company Name',
      period: 'Jan 2026 - Present',
      location: 'Location',
      description: 'Role description...',
      skills: ['React', 'Node.js'],
    }
    const updatedList = [newExp, ...(data.experiences || [])]
    savePortfolioData({ ...data, experiences: updatedList })
  }

  if (loading) {
    return <div className="py-20 text-center font-mono text-zinc-400">Loading experiences...</div>
  }

  // Safe fallback array
  const experiencesList = data?.experiences || []

  return (
    <section id="experience" className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl font-bold font-mono tracking-widest text-primary flex items-center gap-3">
          <Briefcase className="text-accent" /> EXPERIENCE
        </h2>
        <button
          onClick={handleAddExperience}
          className="font-mono text-xs border border-border px-4 py-2 text-primary hover:border-accent hover:text-accent transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus size={14} /> ADD EXPERIENCE
        </button>
      </div>

      <div className="space-y-6">
        {experiencesList.length === 0 ? (
          <p className="text-zinc-500 font-mono text-sm">No experience entries found.</p>
        ) : (
          experiencesList.map((exp) => (
            <div
              key={exp.id}
              className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg relative group hover:border-zinc-700 transition-all"
            >
              {editingId === exp.id ? (
                // EDIT MODE FORM
                <div className="space-y-4 font-mono text-xs">
                  <input
                    type="text"
                    value={editForm.role || ''}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 p-2 text-primary text-base font-bold"
                    placeholder="Role Title"
                  />
                  <input
                    type="text"
                    value={editForm.company || ''}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 p-2 text-secondary"
                    placeholder="Company"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={editForm.period || ''}
                      onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
                      className="bg-zinc-950 border border-zinc-700 p-2 text-secondary"
                      placeholder="Period"
                    />
                    <input
                      type="text"
                      value={editForm.location || ''}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="bg-zinc-950 border border-zinc-700 p-2 text-secondary"
                      placeholder="Location"
                    />
                  </div>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 p-2 text-secondary h-20"
                    placeholder="Description"
                  />
                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-accent text-zinc-950 px-3 py-1 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Check size={14} /> Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-zinc-800 text-zinc-300 px-3 py-1 flex items-center gap-1 cursor-pointer"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // DISPLAY MODE
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100 font-mono">
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
                        className="p-2 border border-zinc-800 text-zinc-400 hover:text-primary hover:border-zinc-700 cursor-pointer"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="p-2 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-950 cursor-pointer"
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
                        className="text-[10px] font-mono bg-zinc-950 border border-zinc-800 px-2 py-1 text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  )
}