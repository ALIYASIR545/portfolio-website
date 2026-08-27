import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Resend API key is missing' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const { name, email, message } = await req.json()

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'afridiyasir47@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}