import { NextResponse } from 'next/server'

export interface SkillCategory {
  id: string
  title: string
  icon: string
  skills: string[]
}

// Default skill categories matching your target UI
let categories: SkillCategory[] = [
  {
    id: '1',
    title: 'Programming Languages',
    icon: 'Code',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'C++'],
  },
  {
    id: '2',
    title: 'AI & Data Science',
    icon: 'Brain',
    skills: ['PyTorch', 'NumPy', 'Pandas', 'Scikit-Learn', 'OpenCV'],
  },
  {
    id: '3',
    title: 'Tools & Frameworks',
    icon: 'Wrench',
    skills: ['Next.js', 'FastAPI', 'LangChain', 'Git', 'Docker'],
  },
]

export async function GET() {
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, title, icon, skills } = body

    const skillsArray = typeof skills === 'string'
      ? skills.split(',').map((s: string) => s.trim()).filter(Boolean)
      : skills

    if (id) {
      categories = categories.map((cat) =>
        cat.id === id ? { ...cat, title, icon, skills: skillsArray } : cat
      )
    } else {
      const newCategory: SkillCategory = {
        id: Date.now().toString(),
        title,
        icon: icon || 'Code',
        skills: skillsArray,
      }
      categories.push(newCategory)
    }

    return NextResponse.json({ success: true, categories })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save category' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    categories = categories.filter((cat) => cat.id !== id)
    return NextResponse.json({ success: true, categories })
  }

  return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
}