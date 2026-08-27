import { NextResponse } from 'next/server'

let heroData = {
  tagline: '// FULL-STACK ENGINEER & AI ARCHITECT',
  name: 'Yasir Ali Shah',
  subtitle: 'Full Stack Software Developer & AI Engineer',
  description:
    'Building scalable web systems, data engineering pipelines, and custom AI applications with modern React, Next.js, Python, and machine learning frameworks.',
  imageUrl: '',
}

export async function GET() {
  return NextResponse.json(heroData)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    heroData = { ...heroData, ...body }
    return NextResponse.json({ success: true, heroData })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update hero section' }, { status: 500 })
  }
}