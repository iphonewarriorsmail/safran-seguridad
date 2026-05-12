import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../utils/supabase/server'

// Simple in-memory rate limiting (Note: in production Vercel Edge, this might reset often, 
// but it works as a basic layer. For robust rate limiting, use Redis/Upstash)
const rateLimitMap = new Map<string, { count: number, timestamp: number }>()

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hora
  const maxRequests = 3

  const rateData = rateLimitMap.get(ip)
  
  if (rateData) {
    if (now - rateData.timestamp < windowMs) {
      if (rateData.count >= maxRequests) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
      }
      rateData.count++
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now })
    }
  } else {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
  }

  try {
    const formData = await request.formData()
    
    // Honeypot check
    const honeypot = formData.get('website_url')
    if (honeypot) {
      // Spam bot filled the hidden field
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
    }

    const data = {
      name: formData.get('name'),
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'),
      service: formData.get('service'),
      message: formData.get('message'),
    }

    const supabase = await createClient()
    const { error } = await supabase.from('leads').insert([data])

    if (error) {
      console.error(error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
