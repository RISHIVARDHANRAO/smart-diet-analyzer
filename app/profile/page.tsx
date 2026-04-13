import { Sidebar } from '@/components/sidebar'
import { ProfileForm } from '@/components/profile-form'

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-2xl">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your personal information and fitness goals
            </p>
          </header>

          <ProfileForm />
        </div>
      </main>
    </div>
  )
}
