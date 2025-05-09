"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  user: string | null
  favorites: string[]
  login: (email: string) => Promise<void>
  register: (email: string) => Promise<void>
  logout: () => void
  toggleFavorite: (countryCode: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedFavorites = localStorage.getItem("favorites")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }

    setIsLoading(false)
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.removeItem("user")
      }
    }
  }, [user, isLoading])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites, isLoading])

  const login = async (email: string) => {
    // In a real app, this would validate credentials with a backend
    // For this demo, we'll just set the user
    setUser(email)
  }

  const register = async (email: string) => {
    // In a real app, this would create a new user in the backend
    // For this demo, we'll just set the user
    setUser(email)
  }

  const logout = () => {
    setUser(null)
  }

  const toggleFavorite = (countryCode: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(countryCode)) {
        return prevFavorites.filter((code) => code !== countryCode)
      } else {
        return [...prevFavorites, countryCode]
      }
    })
  }

  return (
    <AuthContext.Provider value={{ user, favorites, login, register, logout, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
