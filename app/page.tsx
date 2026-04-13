'use client'

import { useEffect, useState } from 'react'
import { Flame, Droplet, Dumbbell, CircleDot } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { MetricCard } from '@/components/metric-card'
import { ProgressCard } from '@/components/progress-card'
import { InsightsCard } from '@/components/insights-card'
import { getTodayTotals, getProfile } from '@/lib/store'
import type { DailyTotals, UserProfile } from '@/lib/types'

export default function DashboardPage() {
  const [totals, setTotals] = useState<DailyTotals>({ calories: 0, sugar: 0, protein: 0, fat: 0 })
  const [profile, setProfile] = useState<UserProfile>({ weight: 70, height: 170, goal: 'maintain', dailyCalorieGoal: 2000 })

  useEffect(() => {
    setTotals(getTodayTotals())
    setProfile(getProfile())
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-5xl">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your daily nutrition and stay on top of your health goals
            </p>
          </header>

          {/* Metric Cards */}
          <div className="grid grid-cols-4 gap-4">
            <MetricCard
              title="Calories"
              value={totals.calories}
              unit="kcal"
              icon={<Flame className="h-5 w-5" />}
              color="green"
            />
            <MetricCard
              title="Sugar"
              value={totals.sugar}
              unit="g"
              icon={<Droplet className="h-5 w-5" />}
              color="blue"
            />
            <MetricCard
              title="Protein"
              value={totals.protein}
              unit="g"
              icon={<Dumbbell className="h-5 w-5" />}
              color="yellow"
            />
            <MetricCard
              title="Fat"
              value={totals.fat}
              unit="g"
              icon={<CircleDot className="h-5 w-5" />}
              color="red"
            />
          </div>

          {/* Progress Section */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <ProgressCard current={totals.calories} goal={profile.dailyCalorieGoal} />
            <InsightsCard profile={profile} totals={totals} />
          </div>

          {/* Quick Stats */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Today&apos;s Summary</h3>
            <div className="mt-4 grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-muted-foreground">Goal</p>
                <p className="mt-1 text-lg font-medium capitalize text-card-foreground">
                  {profile.goal.replace('_', ' ')}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Target Calories</p>
                <p className="mt-1 text-lg font-medium text-card-foreground">
                  {profile.dailyCalorieGoal} kcal
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Remaining</p>
                <p className="mt-1 text-lg font-medium text-primary">
                  {Math.max(profile.dailyCalorieGoal - totals.calories, 0)} kcal
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
