import { NextResponse } from 'next/server'

// Simple in-memory storage for local dev. 
// Replace this variable with a Supabase/PostgreSQL record for production persistence.
let resumeUrl = '/resume.pdf' 

export async function GET() {
  return NextResponse.json({ url: resumeUrl })
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Example logic using Supabase Storage or local bucket saving
    // For now, save or generate public URL:
    resumeUrl = `https://your-cloud-storage.com/resumes/${file.name}`

    return NextResponse.json({ success: true, url: resumeUrl })
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}