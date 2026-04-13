import { Sidebar } from '@/components/sidebar'
import { ScanForm } from '@/components/scan-form'

export default function ScanPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-2xl">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Scan Food</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload a food image or enter nutrition information manually
            </p>
          </header>

          <ScanForm />
        </div>
      </main>
    </div>
  )
}
