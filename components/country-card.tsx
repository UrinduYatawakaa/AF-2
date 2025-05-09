"use client"

import type React from "react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Users, Globe } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface CountryCardProps {
  country: {
    name: {
      common: string
    }
    capital?: string[]
    region: string
    population: number
    flags: {
      png: string
      svg: string
    }
    cca3: string
  }
}

export function CountryCard({ country }: CountryCardProps) {
  const router = useRouter()
  const { user, favorites, toggleFavorite } = useAuth()
  const isFavorite = favorites.includes(country.cca3)

  const handleCardClick = () => {
    router.push(`/country/${country.cca3}`)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (user) {
      toggleFavorite(country.cca3)
    } else {
      router.push("/login")
    }
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative h-[160px] w-full overflow-hidden">
        <Image
          src={country.flags.svg || country.flags.png}
          alt={`Flag of ${country.name.common}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg truncate">{country.name.common}</h3>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${isFavorite ? "text-red-500" : ""}`}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
          </Button>
        </div>
        <div className="mt-2 space-y-1 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            <span>Capital: {country.capital?.join(", ") || "N/A"}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Globe className="mr-1 h-3.5 w-3.5" />
            <span>Region: {country.region}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="mr-1 h-3.5 w-3.5" />
            <span>Population: {country.population.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full" onClick={handleCardClick}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
