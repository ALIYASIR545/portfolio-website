export function About() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6 border-t border-zinc-800">
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-sm text-sky-400">01 /</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 uppercase">About Me</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 text-zinc-400 text-base leading-relaxed">
          <p>
            I am a Full Stack Software Developer and AI Engineer experienced in constructing end-to-end applications, designing microservice backend architectures, and engineering data pipelines.
          </p>
          <p>
            Currently pursuing an MS in Software Engineering with a CGPA of 3.81/4.00 at UET Lahore, my engineering approach combines solid theoretical software design principles with production-grade development across Python, React, Next.js, and machine learning infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 font-mono">
          <div className="p-6 bg-zinc-900/50 border border-zinc-800">
            <span className="text-3xl font-bold text-sky-400 block mb-2">3.81</span>
            <span className="text-xs text-zinc-400 uppercase">MSSE CGPA (UET Lahore)</span>
          </div>
          <div className="p-6 bg-zinc-900/50 border border-zinc-800">
            <span className="text-3xl font-bold text-sky-400 block mb-2">10+</span>
            <span className="text-xs text-zinc-400 uppercase">Technologies & Tools</span>
          </div>
          <div className="p-6 bg-zinc-900/50 border border-zinc-800">
            <span className="text-3xl font-bold text-sky-400 block mb-2">3+</span>
            <span className="text-xs text-zinc-400 uppercase">Engineering Roles</span>
          </div>
          <div className="p-6 bg-zinc-900/50 border border-zinc-800">
            <span className="text-3xl font-bold text-sky-400 block mb-2">100%</span>
            <span className="text-xs text-zinc-400 uppercase">Independent Builder</span>
          </div>
        </div>
      </div>
    </section>
  )
}