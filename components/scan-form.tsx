'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Loader2, Save, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { saveEntry, generateId } from '@/lib/store'

interface NutritionData {
  name: string
  calories: number
  sugar: number
  protein: number
  fat: number
}

export function ScanForm() {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null)

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setNutritionData(null)
        // Simulate OCR analysis with extracted nutrition data
        setIsAnalyzing(true)
        setTimeout(() => {
          setIsAnalyzing(false)
          // Simulated OCR extraction - in production, this would call an actual OCR API
          setNutritionData({
            name: 'Detected Food Item',
            calories: Math.floor(Math.random() * 400) + 100,
            sugar: Math.floor(Math.random() * 20) + 2,
            protein: Math.floor(Math.random() * 30) + 5,
            fat: Math.floor(Math.random() * 25) + 3,
          })
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleSave = useCallback(() => {
    if (!nutritionData) return

    const entry = {
      id: generateId(),
      name: nutritionData.name,
      calories: nutritionData.calories,
      sugar: nutritionData.sugar,
      protein: nutritionData.protein,
      fat: nutritionData.fat,
      date: new Date().toISOString(),
      imageUrl: image || undefined,
    }

    saveEntry(entry)
    
    // Reset form
    setImage(null)
    setNutritionData(null)
    
    router.push('/')
    router.refresh()
  }, [nutritionData, image, router])

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Upload Food Image</h3>
        
        <div className="mt-4">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Uploaded food"
                className="h-64 w-full rounded-lg object-cover"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-2 top-2"
                onClick={() => setImage(null)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 transition-colors hover:border-primary/50 hover:bg-secondary/50">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-card-foreground">Click to upload image</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        {/* Analysis Status */}
        {isAnalyzing && (
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-secondary/50 p-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Analyzing image...</p>
              <p className="text-xs text-muted-foreground">Extracting nutrition information via OCR</p>
            </div>
          </div>
        )}
      </div>

      {/* Extracted Nutrition Data */}
      {nutritionData && !isAnalyzing && (
        <div className="rounded-xl border border-primary/30 bg-card p-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium text-card-foreground">Nutrition Data Extracted</h3>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
              <span className="text-sm text-muted-foreground">Food Name</span>
              <span className="text-sm font-medium text-card-foreground">{nutritionData.name}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-secondary/50 px-4 py-3">
                <p className="text-xs text-muted-foreground">Calories</p>
                <p className="text-lg font-semibold text-card-foreground">{nutritionData.calories} <span className="text-xs font-normal text-muted-foreground">kcal</span></p>
              </div>
              <div className="rounded-lg bg-secondary/50 px-4 py-3">
                <p className="text-xs text-muted-foreground">Sugar</p>
                <p className="text-lg font-semibold text-card-foreground">{nutritionData.sugar} <span className="text-xs font-normal text-muted-foreground">g</span></p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-secondary/50 px-4 py-3">
                <p className="text-xs text-muted-foreground">Protein</p>
                <p className="text-lg font-semibold text-card-foreground">{nutritionData.protein} <span className="text-xs font-normal text-muted-foreground">g</span></p>
              </div>
              <div className="rounded-lg bg-secondary/50 px-4 py-3">
                <p className="text-xs text-muted-foreground">Fat</p>
                <p className="text-lg font-semibold text-card-foreground">{nutritionData.fat} <span className="text-xs font-normal text-muted-foreground">g</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <Button
        className="w-full"
        size="lg"
        onClick={handleSave}
        disabled={!nutritionData}
      >
        <Save className="mr-2 h-4 w-4" />
        Save Entry
      </Button>
    </div>
  )
}
