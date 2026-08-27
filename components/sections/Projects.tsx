'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Play, FileText, ArrowUpRight, Cpu, Plus, X, Upload, Trash2, Edit3 } from 'lucide-react'
import { usePortfolio } from '@/context/PortfolioContext'

export interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  videoUrl?: string
  sourceUrl?: string
  demoUrl?: string
  docsUrl?: string
  tags: string[]
}

export function Projects() {
  const { data, updateSection, loading } = usePortfolio()
  const projects: Project[] = data.projects || []

  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Form State
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [tags, setTags] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)

  const openAddModal = () => {
    setEditingProject(null)
    setTitle('')
    setCategory('Full-Stack / AI System')
    setDescription('')
    setSourceUrl('')
    setImageUrl('')
    setTags('')
    setImageFile(null)
    setVideoFile(null)
    setIsModalOpen(true)
  }

  const openEditModal = (project: Project) => {
    setEditingProject(project)
    setTitle(project.title)
    setCategory(project.category)
    setDescription(project.description)
    setSourceUrl(project.sourceUrl || '')
    setImageUrl(project.image || '')
    setTags(project.tags ? project.tags.join(', ') : '')
    setImageFile(null)
    setVideoFile(null)
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      const formData = new FormData()
      if (editingProject) formData.append('id', editingProject.id)
      formData.append('title', title)
      formData.append('category', category)
      formData.append('description', description)
      formData.append('sourceUrl', sourceUrl)
      formData.append('imageUrl', imageUrl)
      formData.append('tags', tags)

      if (imageFile) formData.append('imageFile', imageFile)
      if (videoFile) formData.append('videoFile', videoFile)

      const res = await fetch('/api/portfolio', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to save project')

      const updatedProjectsList = await res.json()
      
      // Update global context state
      await updateSection('projects', updatedProjectsList)
      setIsModalOpen(false)
    } catch (err) {
      console.error('Save error:', err)
      alert('Failed to save project.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/portfolio?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      
      const updatedProjectsList = projects.filter((p) => p.id !== id)
      await updateSection('projects', updatedProjectsList)
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete project.')
    }
  }

  const handlePlayDemo = (videoUrl?: string) => {
    if (videoUrl && videoUrl.trim() !== '') {
      setActiveVideo(videoUrl)
    } else {
      alert('No demo video uploaded for this project yet.')
    }
  }

  if (loading) {
    return <div className="py-24 text-center font-mono text-zinc-400">Loading projects...</div>
  }

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6 border-t border-zinc-800">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-12"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-cyan-400">03 /</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 uppercase">
            Featured Projects & Systems
          </h2>
        </div>
        <button
          onClick={openAddModal}
          className="font-mono text-xs bg-cyan-400 hover:bg-cyan-300 text-zinc-950 px-4 py-2 font-bold uppercase rounded flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus size={14} /> Add Project
        </button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
            className="group bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/50 rounded-lg overflow-hidden flex flex-col justify-between transition-all relative"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-zinc-950 border-b border-zinc-800">
                <img
                  src={project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-cyan-400 border border-zinc-800 flex items-center gap-1.5">
                  <Cpu size={12} /> {project.category}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(project)}
                    className="bg-zinc-900/90 hover:bg-zinc-800 text-cyan-400 p-1.5 rounded transition-colors cursor-pointer border border-zinc-700"
                    title="Edit Details"
                  >
                    <Edit3 size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-500/80 hover:bg-red-600 text-white p-1.5 rounded transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags?.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] px-2 py-0.5 bg-zinc-950 border border-zinc-800 text-zinc-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 grid grid-cols-2 gap-2.5 font-mono text-xs">
              <a
                href={project.demoUrl || '#'}
                className="py-2 px-3 bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold uppercase rounded text-center transition-colors flex items-center justify-center gap-1"
              >
                Detail <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={project.sourceUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 uppercase rounded text-center transition-colors flex items-center justify-center gap-1"
              >
                Source <Code2 className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => handlePlayDemo(project.videoUrl)}
                className="py-2 px-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 uppercase rounded text-center transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                Demo <Play className="w-3.5 h-3.5" />
              </button>

              <a
                href={project.docsUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 uppercase rounded text-center transition-colors flex items-center justify-center gap-1"
              >
                Docs <FileText className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl rounded-lg overflow-hidden relative">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 bg-zinc-950 text-zinc-400 hover:text-zinc-100 p-2 rounded-full z-10 border border-zinc-800 cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="aspect-video w-full flex items-center justify-center bg-black">
              {activeVideo.startsWith('data:video') || activeVideo.endsWith('.mp4') || activeVideo.endsWith('.webm') ? (
                <video src={activeVideo} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                <iframe
                  src={activeVideo}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg w-full max-w-lg space-y-4 font-mono text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-zinc-100 uppercase">
                {editingProject ? 'Edit Project Image & Details' : 'Add New Project'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="cursor-pointer"><X size={16} /></button>
            </div>

            <input
              type="text" placeholder="Project Title" required
              value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 text-zinc-100 rounded outline-none focus:border-cyan-400"
            />
            <input
              type="text" placeholder="Category (e.g. AI / AgTech)" required
              value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 text-zinc-100 rounded outline-none focus:border-cyan-400"
            />
            <textarea
              placeholder="Description" required rows={3}
              value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 text-zinc-100 rounded outline-none resize-none focus:border-cyan-400"
            />

            <div className="space-y-2 border border-zinc-800 p-3 rounded bg-zinc-950/50">
              <label className="text-zinc-300 font-bold">Thumbnail Image</label>
              <div className="flex items-center gap-3">
                <input
                  type="file" accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="hidden" id="image-file"
                />
                <label htmlFor="image-file" className="cursor-pointer bg-zinc-900 border border-zinc-700 hover:border-zinc-500 px-3 py-2 rounded text-zinc-200 flex items-center gap-2">
                  <Upload size={14} /> Upload Image
                </label>
                {imageFile && <span className="text-cyan-400 text-[10px] truncate max-w-[180px]">{imageFile.name}</span>}
              </div>
              <p className="text-zinc-500 text-[10px]">OR enter image URL directly:</p>
              <input
                type="text" placeholder="https://..."
                value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-2 text-zinc-100 rounded outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-zinc-400">Demo Video File (.mp4, .webm)</label>
              <div className="flex items-center gap-3">
                <input
                  type="file" accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="hidden" id="video-file"
                />
                <label htmlFor="video-file" className="cursor-pointer bg-zinc-950 border border-zinc-800 hover:border-zinc-700 px-4 py-2.5 rounded text-zinc-300 flex items-center gap-2">
                  <Upload size={14} /> Choose Video File
                </label>
                {videoFile && <span className="text-cyan-400 text-[10px] truncate max-w-[200px]">{videoFile.name}</span>}
              </div>
            </div>

            <input
              type="text" placeholder="GitHub Repository URL"
              value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 text-zinc-100 rounded outline-none focus:border-cyan-400"
            />
            <input
              type="text" placeholder="Tags (comma-separated: Python, Next.js, PyTorch)"
              value={tags} onChange={(e) => setTags(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 p-3 text-zinc-100 rounded outline-none focus:border-cyan-400"
            />

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-cyan-400 text-zinc-950 font-bold py-3 uppercase rounded hover:bg-cyan-300 transition-colors mt-4 disabled:opacity-50 cursor-pointer"
            >
              {isUploading ? 'Saving...' : 'Save Project'}
            </button>
          </form>
        </div>
      )}
    </section>
  )
}