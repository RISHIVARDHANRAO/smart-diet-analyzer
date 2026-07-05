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

export interface CommunityPost {
  id: string
  title: string
  description: string
  author: string
  avatar: string
  category: string
  upvotes: number
  comments: number
  tags: string[]
  createdAt: string
  replies?: CommunityComment[]
}

export interface CommunityComment {
  id: string
  author: string
  avatar: string
  content: string
  createdAt: string
  likes: number
}
