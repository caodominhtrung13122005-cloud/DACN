import { Outlet } from 'react-router-dom'

export function BuyerLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-card)]">
        <span className="font-bold text-[var(--color-brand-primary)]">MEKAGREEN Bên mua</span>
      </header>
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default BuyerLayout
