export interface FoodEntry {
  id: string
  name: string
  calories: number
  sugar: number
  protein: number
  fat: number
  date: string
  imageUrl?: string
}

export interface UserProfile {
  weight: number
  height: number
  goal: 'weight_loss' | 'muscle_gain' | 'keto' | 'maintain'
  dailyCalorieGoal: number
}

export interface DailyTotals {
  calories: number
  sugar: number
  protein: number
  fat: number
}
