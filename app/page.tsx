import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Competencies } from '@/components/sections/Competencies'
import { Research } from '@/components/sections/Research'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Competencies />
      <Research />
      <Contact />
    </>
  )
}