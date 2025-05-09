"use client"

import { useEffect, useState } from "react"
import { CountryCard } from "@/components/country-card"
import { useSearchParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

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
  languages?: Record<string, string>
}

export function CountriesGrid() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  const regionFilter = searchParams.get("region") || ""
  const languageFilter = searchParams.get("language") || ""

  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true)
      setError(null)

      try {
        let url = "https://restcountries.com/v3.1/all"

        // If search query is provided, use the name endpoint
        if (searchQuery) {
          url = `https://restcountries.com/v3.1/name/${searchQuery}`
        }
        // If region filter is provided and no search query, use the region endpoint
        else if (regionFilter && !searchQuery && regionFilter !== "all") {
          url = `https://restcountries.com/v3.1/region/${regionFilter}`
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to fetch countries")
        }

        let data = await response.json()

        // Apply region filter if both search query and region filter are provided
        if (regionFilter && searchQuery && regionFilter !== "all") {
          data = data.filter((country: Country) => country.region.toLowerCase() === regionFilter.toLowerCase())
        }

        // Apply language filter if provided
        if (languageFilter && languageFilter !== "all") {
          data = data.filter((country: Country) => {
            if (!country.languages) return false
            return Object.values(country.languages).some((language: string) =>
              language.toLowerCase().includes(languageFilter.toLowerCase()),
            )
          })
        }

        setCountries(data)
      } catch (error) {
        console.error("Error fetching countries:", error)
        setError("Failed to load countries. Please try again.")
        setCountries([])
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [searchQuery, regionFilter, languageFilter])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden border bg-card text-card-foreground shadow"
            data-testid="skeleton"
          >
            <Skeleton className="h-[160px] w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
      </div>
    )
  }

  if (countries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">No countries found matching your criteria.</p>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  )
}
