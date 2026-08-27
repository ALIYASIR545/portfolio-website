'use client'

import { useState } from 'react'

export function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/resume', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      alert('Resume updated successfully!')
      window.location.reload()
    } else {
      alert('Failed to upload resume.')
    }
    setUploading(false)
  }

  return (
    <form onSubmit={handleUpload} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-4">
      <h3 className="text-sm font-mono text-zinc-100 uppercase">Update Resume File</h3>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-500/10 file:text-sky-400 hover:file:bg-sky-500/20"
      />
      <button
        type="submit"
        disabled={uploading}
        className="px-4 py-2 bg-sky-500 text-zinc-950 text-xs font-bold rounded uppercase font-mono"
      >
        {uploading ? 'Uploading...' : 'Save & Publish'}
      </button>
    </form>
  )
}