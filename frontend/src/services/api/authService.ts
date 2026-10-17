import axios from 'axios'
import { apiClient, BACKEND_URL } from './client'
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../../types/auth'

export const authService = {
  /**
   * Initialize Sanctum CSRF cookie for stateful SPA authentication.
   */
  async getCsrfCookie(): Promise<void> {
    await axios.get(`${BACKEND_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
      },
    })
  },

  /**
   * Register a new FARMER or BUYER user.
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    await this.getCsrfCookie()
    const response = await apiClient.post<AuthResponse>('/register', payload)
    return response.data
  },

  /**
   * Log in user with phone number and password.
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    await this.getCsrfCookie()
    const response = await apiClient.post<AuthResponse>('/login', payload)
    return response.data
  },

  /**
   * Log out current user and invalidate server session.
   */
  async logout(): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/logout')
    return response.data
  },

  /**
   * Fetch current authenticated user.
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{ user: User }>('/me')
    return response.data.user
  },
}

export default authService
