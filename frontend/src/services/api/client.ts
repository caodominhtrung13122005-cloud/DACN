import axios from 'axios'

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `${BACKEND_URL}/api`

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/**
 * Helper to extract cookie value from document.cookie by name.
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const raw = parts.pop()?.split(';').shift()
    return raw ? decodeURIComponent(raw) : null
  }
  return null
}

// Ensure X-XSRF-TOKEN is explicitly set for cross-port requests (localhost:5173 -> localhost:8000)
apiClient.interceptors.request.use((config) => {
  const token = getCookie('XSRF-TOKEN')
  if (token && config.headers) {
    config.headers['X-XSRF-TOKEN'] = token
  }
  return config
})

export default apiClient

