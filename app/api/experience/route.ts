import { NextResponse } from 'next/server'

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  location: string
  description: string
  skills: string[]
}

// In-memory data store (or swap with your database / Supabase client)
let experiences: ExperienceItem[] = [
  {
    id: '1',
    role: 'Full Stack & AI Engineer',
    company: 'Independent / Contract',
    period: '2024 - Present',
    location: 'Remote',
    description: 'Engineering microservice backends, full-stack Next.js web applications, and RAG/LLM pipelines.',
    skills: ['Next.js', 'Python', 'FastAPI', 'LangChain', 'PostgreSQL'],
  },
]

export async function GET() {
  return NextResponse.json(experiences)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, role, company, period, location, description, skills } = body

    const skillsArray = typeof skills === 'string' 
      ? skills.split(',').map((s: string) => s.trim()).filter(Boolean)
      : skills

    if (id) {
      // Edit / Update existing experience
      experiences = experiences.map((exp) =>
        exp.id === id
          ? { ...exp, role, company, period, location, description, skills: skillsArray }
          : exp
      )
    } else {
      // Add new experience
      const newExp: ExperienceItem = {
        id: Date.now().toString(),
        role,
        company,
        period,
        location,
        description,
        skills: skillsArray,
      }
      experiences.unshift(newExp)
    }

    return NextResponse.json({ success: true, experiences })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    experiences = experiences.filter((exp) => exp.id !== id)
    return NextResponse.json({ success: true, experiences })
  }

  return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
}