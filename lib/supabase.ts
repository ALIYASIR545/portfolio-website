import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadMedia(file: File, folder: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}.${fileExt}`

  const { error } = await supabase.storage
    .from('portfolio-media')
    .upload(fileName, file, { upsert: true })

  if (error) throw error

  const { data } = supabase.storage
    .from('portfolio-media')
    .getPublicUrl(fileName)

  return data.publicUrl
}