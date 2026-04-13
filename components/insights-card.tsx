'use client'

import { AlertCircle, CheckCircle, Info } from 'lucide-react'
import type { UserProfile, DailyTotals } from '@/lib/types'

interface InsightsCardProps {
  profile: UserProfile
  totals: DailyTotals
}

interface Insight {
  type: 'success' | 'warning' | 'info'
  message: string
}

function getInsights(profile: UserProfile, totals: DailyTotals): Insight[] {
  const insights: Insight[] = []
  
  switch (profile.goal) {
    case 'weight_loss':
      if (totals.calories > profile.dailyCalorieGoal) {
        insights.push({ type: 'warning', message: 'Calorie intake exceeds your weight loss goal. Consider lighter meals.' })
      } else if (totals.calories > 0) {
        insights.push({ type: 'success', message: 'Great job staying within your calorie limit!' })
      }
      if (totals.sugar > 25) {
        insights.push({ type: 'warning', message: 'Sugar intake is high. Try to reduce sugary foods.' })
      }
      break
      
    case 'muscle_gain':
      if (totals.protein < 100 && totals.calories > 0) {
        insights.push({ type: 'info', message: 'Consider adding more protein to support muscle growth.' })
      } else if (totals.protein >= 100) {
        insights.push({ type: 'success', message: 'Excellent protein intake for muscle building!' })
      }
      break
      
    case 'keto':
      if (totals.sugar > 20) {
        insights.push({ type: 'warning', message: 'Sugar/carb intake may affect ketosis. Keep carbs under 20g.' })
      } else if (totals.fat > 0) {
        insights.push({ type: 'success', message: 'Good fat intake for your keto diet!' })
      }
      break
      
    case 'maintain':
      if (totals.calories > 0) {
        const diff = Math.abs(totals.calories - profile.dailyCalorieGoal)
        if (diff < 200) {
          insights.push({ type: 'success', message: 'You are maintaining a balanced calorie intake.' })
        }
      }
      break
  }
  
  if (insights.length === 0 && totals.calories === 0) {
    insights.push({ type: 'info', message: 'Start logging your meals to get personalized insights!' })
  }
  
  return insights
}

const iconMap = {
  success: <CheckCircle className="h-5 w-5 text-chart-1" />,
  warning: <AlertCircle className="h-5 w-5 text-chart-3" />,
  info: <Info className="h-5 w-5 text-chart-2" />,
}

const bgMap = {
  success: 'bg-chart-1/10 border-chart-1/20',
  warning: 'bg-chart-3/10 border-chart-3/20',
  info: 'bg-chart-2/10 border-chart-2/20',
}

export function InsightsCard({ profile, totals }: InsightsCardProps) {
  const insights = getInsights(profile, totals)
  
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-sm font-medium text-muted-foreground">Insights & Recommendations</h3>
      <div className="mt-4 space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className={`flex items-start gap-3 rounded-lg border p-3 ${bgMap[insight.type]}`}>
            {iconMap[insight.type]}
            <p className="text-sm text-card-foreground">{insight.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
