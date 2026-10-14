import { Outlet } from 'react-router-dom'

export function FarmerLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r border-[var(--color-border-subtle)] bg-[var(--color-surface-card)] p-4">
        <div className="font-bold text-[var(--color-brand-primary)]">MEKAGREEN Nông dân</div>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default FarmerLayout
