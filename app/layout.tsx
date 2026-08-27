import './globals.css'
import { PortfolioProvider } from '@/context/PortfolioContext' // Import your context

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Everything inside PortfolioProvider can read and save portfolio data */}
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  )
}