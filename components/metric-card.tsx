import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: number
  unit: string
  icon: React.ReactNode
  color: 'green' | 'blue' | 'yellow' | 'red'
}

const colorClasses = {
  green: 'bg-chart-1/10 text-chart-1',
  blue: 'bg-chart-2/10 text-chart-2',
  yellow: 'bg-chart-3/10 text-chart-3',
  red: 'bg-chart-4/10 text-chart-4',
}

export function MetricCard({ title, value, unit, icon, color }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-card-foreground">
            {value.toFixed(0)}
            <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>
          </p>
        </div>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', colorClasses[color])}>
          {icon}
        </div>
      </div>
    </div>
  )
}
