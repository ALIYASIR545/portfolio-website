export function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-secondary">
        <div>
          © {new Date().getFullYear()} YASIR ALI SHAH. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/ALIYASIR545" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GITHUB</a>
          <a href="https://linkedin.com/in/yasir-ali-afridi-5332161b6" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LINKEDIN</a>
          <a href="mailto:afridiyasir47@gmail.com" className="hover:text-accent transition-colors">EMAIL</a>
        </div>
      </div>
    </footer>
  )
}