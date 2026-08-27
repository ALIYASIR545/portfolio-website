// app/page.tsx
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { ExperienceSection as Experience } from '@/components/sections/Experience' // Added /sections/
import { Research } from '@/components/sections/Research'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="bg-zinc-950 text-zinc-100 min-h-screen">
      <Hero />
      <About />      {/* 01 / ABOUT ME */}
      <Skills />     {/* 03 / SKILLS & EXPERTISE */}
      <Projects />   {/* 02 / FEATURED PROJECTS & SYSTEMS */}
      <Experience /> {/* 04 / WORK EXPERIENCE */}
      <Research />   {/* 05 / RESEARCH & PUBLICATIONS */}
      <Contact />    {/* 06 / GET IN TOUCH */}
    </main>
  )
}