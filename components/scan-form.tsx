'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Loader2, Save, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { saveEntry, generateId } from '@/lib/store'

export function ScanForm() {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [ocrResult, setOcrResult] = useState<string>('')
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [sugar, setSugar] = useState('')
  const [protein, setProtein] = useState('')
  const [fat, setFat] = useState('')

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        // Simulate OCR analysis
        setIsAnalyzing(true)
        setTimeout(() => {
          setIsAnalyzing(false)
          setOcrResult('OCR integration ready. Use manual input or connect your OCR service.')
        }, 1500)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleSave = useCallback(() => {
    if (!name || !calories) return

    const entry = {
      id: generateId(),
      name,
      calories: parseFloat(calories) || 0,
      sugar: parseFloat(sugar) || 0,
      protein: parseFloat(protein) || 0,
      fat: parseFloat(fat) || 0,
      date: new Date().toISOString(),
      imageUrl: image || undefined,
    }

    saveEntry(entry)
    
    // Reset form
    setImage(null)
    setOcrResult('')
    setName('')
    setCalories('')
    setSugar('')
    setProtein('')
    setFat('')
    
    router.push('/')
    router.refresh()
  }, [name, calories, sugar, protein, fat, image, router])

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

        {/* OCR Result */}
        {isAnalyzing && (
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-secondary/50 p-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm text-card-foreground">Analyzing image...</p>
          </div>
        )}

        {ocrResult && !isAnalyzing && (
          <div className="mt-4 rounded-lg bg-secondary/50 p-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">OCR Output</p>
            </div>
            <p className="mt-2 text-sm text-card-foreground">{ocrResult}</p>
          </div>
        )}
      </div>

      {/* Manual Input Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Nutrition Information</h3>
        <p className="mt-1 text-xs text-muted-foreground">Enter values manually or let OCR fill them</p>
        
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="name" className="text-card-foreground">Food Name</Label>
            <Input
              id="name"
              placeholder="e.g., Chicken Salad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="calories" className="text-card-foreground">Calories (kcal)</Label>
              <Input
                id="calories"
                type="number"
                placeholder="0"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="sugar" className="text-card-foreground">Sugar (g)</Label>
              <Input
                id="sugar"
                type="number"
                placeholder="0"
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="protein" className="text-card-foreground">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                placeholder="0"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="fat" className="text-card-foreground">Fat (g)</Label>
              <Input
                id="fat"
                type="number"
                placeholder="0"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <Button
        className="w-full"
        size="lg"
        onClick={handleSave}
        disabled={!name || !calories}
      >
        <Save className="mr-2 h-4 w-4" />
        Save Entry
      </Button>
    </div>
  )
}
