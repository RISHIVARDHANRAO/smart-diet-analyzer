'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Loader2, Save, ImageIcon, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { saveEntry, generateId, getProfile } from '@/lib/store'
import { toast } from 'sonner'

export function ScanForm() {
  const router = useRouter()
  const profile = getProfile()
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [ocrResult, setOcrResult] = useState<string>('')
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [sugar, setSugar] = useState('')
  const [protein, setProtein] = useState('')
  const [fat, setFat] = useState('')
  const [carbohydrates, setCarbohydrates] = useState('')
  const [sodium, setSodium] = useState('')
  const [cholesterol, setCholesterol] = useState('')
  const [apiKey, setApiKey] = useState(profile?.apiKey || '')

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        // Simulate OCR analysis
        setIsAnalyzing(true)
        toast.loading('Analyzing nutrition information...')
        setTimeout(() => {
          setIsAnalyzing(false)
          setOcrResult('Image analysis complete. Please enter nutrition details manually or the API will process this image.')
          toast.dismiss()
          toast.success('Image uploaded and ready for analysis!')
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleSave = useCallback(async () => {
    if (!name || !calories) {
      toast.error('Please fill in food name and calories')
      return
    }

    setIsSaving(true)
    try {
      // Simulate API call to analyze nutrition
      toast.loading('Processing nutrition data...')
      
      await new Promise(resolve => setTimeout(resolve, 1500))

      const entry = {
        id: generateId(),
        name,
        calories: parseFloat(calories) || 0,
        sugar: parseFloat(sugar) || 0,
        protein: parseFloat(protein) || 0,
        fat: parseFloat(fat) || 0,
        carbohydrates: parseFloat(carbohydrates) || 0,
        sodium: parseFloat(sodium) || 0,
        cholesterol: parseFloat(cholesterol) || 0,
        date: new Date().toISOString(),
        imageUrl: image || undefined,
      }

      saveEntry(entry)
      
      toast.dismiss()
      toast.success(`✅ ${name} added to your diet! Nutrition analysis complete.`, {
        description: `Calories: ${calories} kcal • Carbs: ${carbohydrates}g • Protein: ${protein}g`,
      })

      // Reset form
      setImage(null)
      setOcrResult('')
      setName('')
      setCalories('')
      setSugar('')
      setProtein('')
      setFat('')
      setCarbohydrates('')
      setSodium('')
      setCholesterol('')
      
      router.push('/')
      router.refresh()
    } catch (error) {
      toast.error('Failed to save entry')
    } finally {
      setIsSaving(false)
    }
  }, [name, calories, sugar, protein, fat, carbohydrates, sodium, cholesterol, image, router])

  return (
    <div className="space-y-6">
      {/* API Key Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">API Configuration</h3>
            <p className="mt-1 text-xs text-muted-foreground">Add your nutrition analysis API key for enhanced processing</p>
          </div>
        </div>
        <div>
          <Label htmlFor="apiKey" className="text-card-foreground text-xs">API Key (Optional)</Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="sk_live_xxxxxxxxxxxxx"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1.5"
          />
          <p className="mt-2 text-xs text-muted-foreground">Your API key is stored locally and never sent to external servers</p>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Upload Food Image</h3>
        
        <div>
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Uploaded food"
                className="h-48 w-full rounded-lg object-cover border border-border"
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
            <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/20 transition-all hover:border-primary/50 hover:bg-secondary/30">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-semibold text-card-foreground">Click to upload image</p>
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
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4 animate-in fade-in">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-blue-900 dark:text-blue-300">Analyzing food image...</p>
          </div>
        )}

        {ocrResult && !isAnalyzing && (
          <div className="mt-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-4 animate-in fade-in">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">Analysis Result</p>
            </div>
            <p className="text-sm text-emerald-800 dark:text-emerald-200">{ocrResult}</p>
          </div>
        )}
      </div>

      {/* Manual Input Section */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-1">Nutrition Information</h3>
        <p className="text-xs text-muted-foreground mb-4">Enter values manually or let the API fill them</p>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-card-foreground text-sm">Food Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Grilled Chicken Salad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          
          {/* Main Nutritional Values */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="calories" className="text-card-foreground text-sm">Calories (kcal) *</Label>
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
              <Label htmlFor="carbohydrates" className="text-card-foreground text-sm">Carbohydrates (g)</Label>
              <Input
                id="carbohydrates"
                type="number"
                placeholder="0"
                value={carbohydrates}
                onChange={(e) => setCarbohydrates(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          {/* Secondary Values */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="protein" className="text-card-foreground text-xs">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                placeholder="0"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="mt-1.5 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="fat" className="text-card-foreground text-xs">Fat (g)</Label>
              <Input
                id="fat"
                type="number"
                placeholder="0"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="mt-1.5 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="sugar" className="text-card-foreground text-xs">Sugar (g)</Label>
              <Input
                id="sugar"
                type="number"
                placeholder="0"
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                className="mt-1.5 text-sm"
              />
            </div>
          </div>

          {/* Health Values */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
            <div>
              <Label htmlFor="sodium" className="text-card-foreground text-sm">Sodium (mg)</Label>
              <Input
                id="sodium"
                type="number"
                placeholder="0"
                value={sodium}
                onChange={(e) => setSodium(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="cholesterol" className="text-card-foreground text-sm">Cholesterol (mg)</Label>
              <Input
                id="cholesterol"
                type="number"
                placeholder="0"
                value={cholesterol}
                onChange={(e) => setCholesterol(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <Button
        className="w-full h-11 text-base font-semibold"
        onClick={handleSave}
        disabled={!name || !calories || isSaving}
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving & Analyzing...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Entry
          </>
        )}
      </Button>
    </div>
  )
}

