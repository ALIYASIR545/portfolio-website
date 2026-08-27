'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const PortfolioContext = createContext<any>(null)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<any>({ projects: [], experiences: [] })
  const [loading, setLoading] = useState(true)

  const fetchPortfolioData = async () => {
    try {
      const res = await fetch('/api/portfolio')
      const result = await res.json()
      
      if (Array.isArray(result)) {
        setData((prev: any) => ({ ...prev, projects: result }))
      } else if (result) {
        setData({
          projects: result.projects || [],
          experiences: result.experiences || [],
          ...result
        })
      }
    } catch (err) {
      console.error('Failed to fetch portfolio:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolioData()
  }, [])

  const updateSection = async (sectionKey: string, updatedItems: any) => {
    setData((prev: any) => ({ ...prev, [sectionKey]: updatedItems }))
  }

  return (
    <PortfolioContext.Provider value={{ data, loading, updateSection, refetch: fetchPortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => useContext(PortfolioContext)