"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CountryCard } from "@/components/country-card"
import { useAuth } from "@/context/auth-context"
import { ArrowLeft } from "lucide-react"

interface Country {
  name: {
    common: string
  }
  capital: string[]
  region: string
  population: number
  flags: {
    png: string
    svg: string
  }
  cca3: string
}

export default function FavoritesPage() {
  const router = useRouter()
  const { user, favorites } = useAuth()
  const [favoriteCountries, setFavoriteCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setFavoriteCountries([])
        setLoading(false)
        return
      }

      try {
        const codes = favorites.join(",")
        const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}`)
        const data = await response.json()
        setFavoriteCountries(data)
      } catch (error) {
        console.error("Error fetching favorite countries:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user, favorites, router])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <h1 className="text-3xl font-bold mb-8">Your Favorite Countries</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading your favorites...</p>
          </div>
        ) : favoriteCountries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">You haven't added any countries to your favorites yet.</p>
            <Button onClick={() => router.push("/")}>Explore Countries</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
