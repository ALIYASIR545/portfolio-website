import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

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

let dynamicProjects: Project[] = [
  {
    id: 'hadith-vault',
    title: 'Hadith Vault',
    category: 'Full-Stack / Search Engine',
    description: 'Structured digital repository and search engine for indexing Hadith collections.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=60',
    videoUrl: '',
    sourceUrl: 'https://github.com/ALIYASIR545/HadithVault',
    demoUrl: '#',
    docsUrl: '#',
    tags: ['React', 'Next.js', 'TypeScript', 'PostgreSQL']
  },
  {
    id: 'research-summarizer',
    title: 'Research Paper Summarizer',
    category: 'AI / Document Intelligence',
    description: 'LLM agent that ingests academic PDFs and extracts key methodologies and findings.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60',
    videoUrl: '',
    sourceUrl: 'https://github.com/ALIYASIR545/Research-Paper-Summarize',
    demoUrl: '#',
    docsUrl: '#',
    tags: ['Python', 'LangChain', 'FastAPI', 'LLMs']
  },
  {
    id: 'global-company-agent',
    title: 'Global Company Intelligence Agent',
    category: 'Autonomous Agents / Web Intelligence',
    description: 'Autonomous research assistant performing web intelligence extraction and financial summary generation.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    videoUrl: '',
    sourceUrl: 'https://github.com/ALIYASIR545',
    demoUrl: '#',
    docsUrl: '#',
    tags: ['Python', 'LangChain', 'OpenAI', 'Streamlit']
  },
  {
    id: 'psx-analytics',
    title: 'PSX Intelligence Analytics Dashboard',
    category: 'FinTech / Data Engineering',
    description: 'Real-time financial analytics dashboard tracking Pakistan Stock Exchange data and trends.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
    videoUrl: '',
    sourceUrl: 'https://github.com/ALIYASIR545',
    demoUrl: '#',
    docsUrl: '#',
    tags: ['Python', 'Pandas', 'Next.js', 'FastAPI']
  },
  {
    id: 'crops-disease-system',
    title: 'Crops Disease AI System',
    category: 'Computer Vision / AgTech',
    description: 'Deep Learning solution leveraging CNNs to detect and classify crop diseases early.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=60',
    videoUrl: '',
    sourceUrl: 'https://github.com/ALIYASIR545',
    demoUrl: '#',
    docsUrl: '#',
    tags: ['PyTorch', 'CNN', 'FastAPI', 'React']
  }
]

export async function GET() {
  return NextResponse.json(dynamicProjects)
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    
    const id = (formData.get('id') as string) || Date.now().toString()
    const title = (formData.get('title') as string) || 'Untitled Project'
    const category = (formData.get('category') as string) || 'Full-Stack'
    const description = (formData.get('description') as string) || ''
    const sourceUrl = (formData.get('sourceUrl') as string) || '#'
    const imageUrlInput = (formData.get('imageUrl') as string) || ''
    const tagsString = (formData.get('tags') as string) || ''
    const tags = tagsString ? tagsString.split(',').map(t => t.trim()) : []
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    // Default image fallback
    let imagePath = imageUrlInput || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'
    const imageFile = formData.get('imageFile') as File | null
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, buffer)
      imagePath = `/uploads/${fileName}`
    }

    let videoPath = ''
    const videoFile = formData.get('videoFile') as File | null
    if (videoFile && videoFile.size > 0) {
      const bytes = await videoFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${Date.now()}-${videoFile.name.replace(/\s+/g, '_')}`
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, buffer)
      videoPath = `/uploads/${fileName}`
    }

    const existingIndex = dynamicProjects.findIndex(p => p.id === id)

    const updatedProject: Project = {
      id,
      title,
      category,
      description,
      image: imagePath,
      videoUrl: videoPath || (existingIndex !== -1 ? dynamicProjects[existingIndex].videoUrl : ''),
      sourceUrl,
      demoUrl: '#',
      docsUrl: '#',
      tags
    }

    if (existingIndex !== -1) {
      dynamicProjects[existingIndex] = updatedProject
    } else {
      dynamicProjects.unshift(updatedProject)
    }

    return NextResponse.json(updatedProject, { status: 200 })
  } catch (error) {
    console.error('Upload Error:', error)
    return NextResponse.json({ error: 'Failed to upload project' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  dynamicProjects = dynamicProjects.filter((p) => p.id !== id)
  return NextResponse.json({ success: true })
}