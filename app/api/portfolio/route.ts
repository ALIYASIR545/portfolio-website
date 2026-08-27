import { NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'

const jsonPath = path.join(process.cwd(), 'data', 'portfolio.json')

// Helper to safely read current file contents without wiping data
async function getPortfolioData() {
  try {
    const fileContent = await readFile(jsonPath, 'utf-8')
    return JSON.parse(fileContent)
  } catch {
    return { projects: [], experiences: [] }
  }
}

// Helper to write back to portfolio.json
async function savePortfolioData(data: any) {
  await writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET() {
  const data = await getPortfolioData()
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  try {
    const fullData = await getPortfolioData()
    const contentType = req.headers.get('content-type') || ''

    // 1. JSON Payloads (from Experience, Hero, Profile, etc.)
    if (contentType.includes('application/json')) {
      const body = await req.json()
      
      // Preserve existing keys while updating/overwriting incoming keys
      const mergedData = {
        ...fullData,
        ...body,
      }

      await savePortfolioData(mergedData)
      return NextResponse.json(mergedData)
    }

    // 2. FormData Payloads (from Project Upload Form)
    const formData = await req.formData()
    const id = (formData.get('id') as string) || Date.now().toString()
    const title = (formData.get('title') as string) || 'Untitled Project'
    const category = (formData.get('category') as string) || 'Full-Stack'
    const description = (formData.get('description') as string) || ''
    const sourceUrl = (formData.get('sourceUrl') as string) || '#'
    const imageUrlInput = (formData.get('imageUrl') as string) || ''
    const tagsString = (formData.get('tags') as string) || ''
    const tags = tagsString ? tagsString.split(',').map((t) => t.trim()).filter(Boolean) : []

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    // Handle Image File
    let imagePath = imageUrlInput || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'
    const imageFile = formData.get('imageFile') as File | null
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer()
      const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`
      await writeFile(path.join(uploadDir, fileName), Buffer.from(bytes))
      imagePath = `/uploads/${fileName}`
    }

    // Handle Video File
    let videoPath = ''
    const videoFile = formData.get('videoFile') as File | null
    if (videoFile && videoFile.size > 0) {
      const bytes = await videoFile.arrayBuffer()
      const fileName = `${Date.now()}-${videoFile.name.replace(/\s+/g, '_')}`
      await writeFile(path.join(uploadDir, fileName), Buffer.from(bytes))
      videoPath = `/uploads/${fileName}`
    }

    const projectsList = Array.isArray(fullData.projects) ? fullData.projects : []
    const existingIndex = projectsList.findIndex((p: any) => p.id === id)

    const updatedProject = {
      id,
      title,
      category,
      description,
      image: imagePath,
      videoUrl: videoPath || (existingIndex !== -1 ? projectsList[existingIndex].videoUrl : ''),
      sourceUrl,
      demoUrl: '#',
      docsUrl: '#',
      tags,
    }

    if (existingIndex !== -1) {
      projectsList[existingIndex] = updatedProject
    } else {
      projectsList.unshift(updatedProject)
    }

    // Retain all top-level properties (experiences, bio, etc.) and update projects
    fullData.projects = projectsList
    await savePortfolioData(fullData)

    return NextResponse.json(fullData, { status: 200 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const fullData = await getPortfolioData()
    fullData.projects = (fullData.projects || []).filter((p: any) => p.id !== id)

    await savePortfolioData(fullData)
    return NextResponse.json(fullData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}