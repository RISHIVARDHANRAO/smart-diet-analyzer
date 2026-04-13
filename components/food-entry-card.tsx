'use client'

import { Trash2, Flame, Droplet, Dumbbell, CircleDot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { FoodEntry } from '@/lib/types'

interface FoodEntryCardProps {
  entry: FoodEntry
  onDelete: (id: string) => void
}

export function FoodEntryCard({ entry, onDelete }: FoodEntryCardProps) {
  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-card-foreground">{entry.name}</h4>
          <p className="mt-1 text-xs text-muted-foreground">{formattedDate}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(entry.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-4 grid grid-cols-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-1/10">
            <Flame className="h-4 w-4 text-chart-1" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Calories</p>
            <p className="text-sm font-medium text-card-foreground">{entry.calories}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-2/10">
            <Droplet className="h-4 w-4 text-chart-2" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Sugar</p>
            <p className="text-sm font-medium text-card-foreground">{entry.sugar}g</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-3/10">
            <Dumbbell className="h-4 w-4 text-chart-3" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Protein</p>
            <p className="text-sm font-medium text-card-foreground">{entry.protein}g</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-4/10">
            <CircleDot className="h-4 w-4 text-chart-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Fat</p>
            <p className="text-sm font-medium text-card-foreground">{entry.fat}g</p>
          </div>
        </div>
      </div>
    </div>
  )
}
