'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { FoodEntryCard } from '@/components/food-entry-card'
import { getEntries, deleteEntry } from '@/lib/store'
import type { FoodEntry } from '@/lib/types'

export default function HistoryPage() {
  const [entries, setEntries] = useState<FoodEntry[]>([])

  useEffect(() => {
    setEntries(getEntries())
  }, [])

  const handleDelete = (id: string) => {
    deleteEntry(id)
    setEntries(getEntries())
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-3xl">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">History</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View and manage your food entries
            </p>
          </header>

          {entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium text-card-foreground">No entries yet</p>
              <p className="mt-1 text-xs text-muted-foreground">Start by scanning or adding a food item</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <FoodEntryCard key={entry.id} entry={entry} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
