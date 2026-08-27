export function About() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6 border-t border-zinc-800/80">
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-sm text-sky-400 font-semibold tracking-wider">01 /</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100 uppercase">About Me</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Bio Text */}
        <div className="space-y-6 text-zinc-400 text-base leading-relaxed bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800/60 backdrop-blur-sm">
          <p>
            I am a <span className="text-zinc-200 font-medium">Full Stack Software Developer</span> and <span className="text-zinc-200 font-medium">AI Engineer</span> experienced in constructing end-to-end applications, designing microservice backend architectures, and engineering high-throughput data pipelines.
          </p>
          <p>
            Currently pursuing an <span className="text-sky-400 font-medium">MS in Software Engineering (CGPA 3.81/4.00)</span> at UET Lahore, my engineering approach combines solid theoretical software design principles with production-grade development across Python, React, Next.js, and machine learning infrastructure.
          </p>
        </div>

        {/* Highlight Metrics Cards */}
        <div className="grid grid-cols-2 gap-5 font-mono">
          <div className="group p-6 bg-gradient-to-br from-zinc-900/80 to-zinc-900/30 border border-zinc-800 rounded-xl hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 block mb-2 group-hover:scale-105 transition-transform duration-300">3.89</span>
            <span className="text-xs text-zinc-400 font-sans font-medium uppercase tracking-wider block">MSSE CGPA (UET Lahore)</span>
          </div>

          <div className="group p-6 bg-gradient-to-br from-zinc-900/80 to-zinc-900/30 border border-zinc-800 rounded-xl hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 block mb-2 group-hover:scale-105 transition-transform duration-300">1.5+</span>
            <span className="text-xs text-zinc-400 font-sans font-medium uppercase tracking-wider block">Years Experience</span>
          </div>

          <div className="group p-6 bg-gradient-to-br from-zinc-900/80 to-zinc-900/30 border border-zinc-800 rounded-xl hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 block mb-2 group-hover:scale-105 transition-transform duration-300">10+</span>
            <span className="text-xs text-zinc-400 font-sans font-medium uppercase tracking-wider block">Projects & Systems</span>
          </div>

          <div className="group p-6 bg-gradient-to-br from-zinc-900/80 to-zinc-900/30 border border-zinc-800 rounded-xl hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 block mb-2 group-hover:scale-105 transition-transform duration-300">100%</span>
            <span className="text-xs text-zinc-400 font-sans font-medium uppercase tracking-wider block">Independent Builder</span>
          </div>
        </div>
      </div>
    </section>
  )
}