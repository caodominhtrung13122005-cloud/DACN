import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ToastProvider } from '../components/ui'
import { AuthProvider } from '../features/auth'

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
