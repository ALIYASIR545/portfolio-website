'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import Link from 'next/link'
import { ArrowDownRight, Edit3, X, Upload, Image as ImageIcon, User, Send } from 'lucide-react'
import { supabase, uploadMedia } from '@/lib/supabase'

export function Hero() {
  // Initialize with immediate fallback data so the screen NEVER goes blank
  const [data, setData] = useState({
    id: 1,
    name: 'ALI YASIR',
    subtitle: 'Full-Stack Software Developer & AI Engineer',
    description: 'Experienced in constructing end-to-end applications, designing microservice backend architectures, and engineering high-throughput data pipelines.',
    avatar_url: '',
    tagline: '// SOFTWARE ARCHITECT & AI ENGINEER'
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Form State
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')

  const fetchHeroData = async () => {
    try {
      const { data: profile } = await supabase.from('profile').select('*').limit(1).maybeSingle()
      if (profile) {
        setData((prev) => ({
          ...prev,
          ...profile,
          name: profile.name || prev.name,
          subtitle: profile.subtitle || profile.title || prev.subtitle,
          description: profile.description || profile.bio || prev.description,
          avatar_url: profile.avatar_url || prev.avatar_url
        }))
        setImageUrl(profile.avatar_url || '')
        setName(profile.name || data.name)
        setSubtitle(profile.subtitle || profile.title || data.subtitle)
        setDescription(profile.description || profile.bio || data.description)
      }
    } catch (err) {
      console.warn('Using local fallback state for Hero section:', err)
    }
  }

  useEffect(() => {
    fetchHeroData()
  }, [])

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const publicUrl = await uploadMedia(file, 'avatars')
      setImageUrl(publicUrl)
      setImgError(false)
    } catch (err) {
      alert('Upload failed: ' + err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const payload = {
        id: 1,
        name,
        subtitle,
        title: subtitle,
        description,
        bio: description,
        avatar_url: imageUrl,
      }

      await supabase.from('profile').upsert(payload)
      
      setData((prev) => ({ ...prev, ...payload }))
      setIsModalOpen(false)
    } catch (err) {
      alert('Failed to save to Supabase: ' + err)
    } finally {
      setIsSaving(false)
    }
  }

  const openModal = () => {
    setName(data.name)
    setSubtitle(data.subtitle)
    setDescription(data.description)
    setImageUrl(data.avatar_url)
    setIsModalOpen(true)
  }

  return (
    <section id="home" className="pt-32 pb-20 max-w-7xl mx-auto px-6 border-b border-zinc-800/80 relative">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs sm:text-sm text-cyan-400 tracking-wider">
              {data.tagline}
            </p>
            <button
              onClick={openModal}
              className="font-mono text-xs bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-zinc-800 px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 size={13} /> Edit Hero
            </button>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-zinc-100 uppercase">
            {data.name}
          </h1>

          <h2 className="text-xl sm:text-2xl font-medium text-zinc-400">
            {data.subtitle}
          </h2>

          <p className="text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed font-sans">
            {data.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
            <Link
              href="#projects"
              className="bg-zinc-100 text-zinc-950 font-bold px-6 py-3.5 rounded-lg flex items-center gap-2 hover:bg-cyan-400 transition-colors uppercase"
            >
              View Projects <ArrowDownRight size={16} />
            </Link>

            <a
              href="https://drive.google.com/file/d/1E4cNJE1kXY2FYuWk-C3ufbDYvsTfTzLB/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-zinc-800 text-zinc-300 font-bold px-6 py-3.5 rounded-lg flex items-center gap-2 hover:border-zinc-700 hover:text-white transition-colors uppercase"
            >
              DOWNLOAD RESUME
            </a>

            <Link
              href="#contact"
              className="border border-zinc-800 text-zinc-400 font-bold px-6 py-3.5 rounded-lg flex items-center gap-2 hover:border-zinc-700 hover:text-zinc-200 transition-colors uppercase"
            >
              Contact Me <Send size={14} />
            </Link>
          </div>
        </div>

        {/* Right Side: Profile Picture Box */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-square group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />

            <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-zinc-800 bg-zinc-900 flex items-center justify-center shadow-2xl">
              {!imgError && data.avatar_url ? (
                <img
                  src={data.avatar_url}
                  alt={data.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-zinc-500 font-mono text-xs p-6 text-center">
                  <User size={64} className="text-zinc-700" />
                  <span>No profile photo configured</span>
                  <button
                    onClick={openModal}
                    className="text-cyan-400 underline hover:text-cyan-300 cursor-pointer"
                  >
                    Upload Photo from PC
                  </button>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl w-full max-w-lg space-y-4 font-mono text-xs"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-zinc-100 uppercase flex items-center gap-2">
                <ImageIcon size={16} className="text-cyan-400" /> Dynamic Hero Setup
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1">Choose Photo from Computer</label>
              <label className="flex items-center justify-center gap-2 border border-dashed border-zinc-700 hover:border-cyan-400 bg-zinc-950 p-4 rounded-lg cursor-pointer transition-colors text-zinc-300">
                <Upload size={18} className="text-cyan-400" />
                <span>{isUploading ? 'Uploading to Supabase...' : 'Upload Image File (PNG, JPG)'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1">Photo URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 text-zinc-100 rounded-lg outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 text-zinc-100 rounded-lg outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1">Subtitle</label>
              <input
                type="text"
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 text-zinc-100 rounded-lg outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1">Description</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 p-3 text-zinc-100 rounded-lg outline-none resize-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="w-full bg-cyan-400 text-zinc-950 font-bold py-3 uppercase rounded-lg hover:bg-cyan-300 transition-colors mt-4 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? 'Saving...' : 'Save & Update'}
            </button>
          </form>
        </div>
      )}
    </section>
  )
}