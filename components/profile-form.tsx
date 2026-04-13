'use client'

import { useState, useEffect } from 'react'
import { Save, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getProfile, saveProfile } from '@/lib/store'
import type { UserProfile } from '@/lib/types'

const goals = [
  { value: 'weight_loss', label: 'Weight Loss', description: 'Reduce calorie intake' },
  { value: 'muscle_gain', label: 'Muscle Gain', description: 'High protein focus' },
  { value: 'keto', label: 'Keto Diet', description: 'Low carb, high fat' },
  { value: 'maintain', label: 'Maintain Weight', description: 'Balanced nutrition' },
] as const

export function ProfileForm() {
  const [profile, setProfile] = useState<UserProfile>({
    weight: 70,
    height: 170,
    goal: 'maintain',
    dailyCalorieGoal: 2000,
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setProfile(getProfile())
  }, [])

  const handleSave = () => {
    saveProfile(profile)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Body Metrics */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Body Metrics</h3>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight" className="text-card-foreground">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={profile.weight}
              onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) || 0 })}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="height" className="text-card-foreground">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={profile.height}
              onChange={(e) => setProfile({ ...profile, height: parseFloat(e.target.value) || 0 })}
              className="mt-1.5"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <Label htmlFor="calorieGoal" className="text-card-foreground">Daily Calorie Goal (kcal)</Label>
          <Input
            id="calorieGoal"
            type="number"
            value={profile.dailyCalorieGoal}
            onChange={(e) => setProfile({ ...profile, dailyCalorieGoal: parseFloat(e.target.value) || 2000 })}
            className="mt-1.5"
          />
        </div>
      </div>

      {/* Fitness Goal */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Fitness Goal</h3>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          {goals.map((goal) => (
            <button
              key={goal.value}
              onClick={() => setProfile({ ...profile, goal: goal.value })}
              className={`flex flex-col items-start rounded-lg border p-4 text-left transition-colors ${
                profile.goal === goal.value
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary/30 hover:border-primary/50'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-medium text-card-foreground">{goal.label}</span>
                {profile.goal === goal.value && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </div>
              <span className="mt-1 text-xs text-muted-foreground">{goal.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* BMI Display */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Body Mass Index (BMI)</h3>
        <div className="mt-4">
          {profile.height > 0 && profile.weight > 0 ? (
            <>
              <p className="text-3xl font-semibold text-card-foreground">
                {(profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {(() => {
                  const bmi = profile.weight / Math.pow(profile.height / 100, 2)
                  if (bmi < 18.5) return 'Underweight'
                  if (bmi < 25) return 'Normal weight'
                  if (bmi < 30) return 'Overweight'
                  return 'Obese'
                })()}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Enter weight and height to calculate BMI</p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <Button className="w-full" size="lg" onClick={handleSave}>
        {saved ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Saved!
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Profile
          </>
        )}
      </Button>
    </div>
  )
}
