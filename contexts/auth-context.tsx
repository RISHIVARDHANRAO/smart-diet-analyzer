'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User, AuthContextType } from '@/lib/types'
import { saveUser, clearUser, getCurrentUser } from '@/lib/store'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    // Initialize demo user if not exists
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    if (storedUsers.length === 0) {
      const demoUser = {
        id: '1',
        email: 'demo@example.com',
        password: 'demo123'
      }
      storedUsers.push(demoUser)
      localStorage.setItem('users', JSON.stringify(storedUsers))
    }

    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call - in production, this would be a real backend call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // For demo purposes, validate basic requirements
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      // Check if user exists in localStorage (simulated)
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const existingUser = storedUsers.find((u: any) => u.email === email && u.password === password)
      
      if (!existingUser) {
        throw new Error('Invalid email or password')
      }
      
      const userData = { id: existingUser.id, email: existingUser.email }
      saveUser(userData)
      setUser(userData)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      // Check if user already exists
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
      if (storedUsers.some((u: any) => u.email === email)) {
        throw new Error('User with this email already exists')
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password
      }
      
      storedUsers.push(newUser)
      localStorage.setItem('users', JSON.stringify(storedUsers))
      
      const userData = { id: newUser.id, email: newUser.email }
      saveUser(userData)
      setUser(userData)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      clearUser()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
