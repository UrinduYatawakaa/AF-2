"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/context/auth-context"
import { ArrowLeft, Heart, MapPin, Users, Globe, Languages } from "lucide-react"
import Image from "next/image"

interface Country {
  name: {
    common: string
    official: string
    nativeName: Record<string, { official: string; common: string }>
  }
  capital: string[]
  region: string
  subregion: string
  population: number
  flags: {
    png: string
    svg: string
    alt: string
  }
  languages: Record<string, string>
  borders: string[]
  currencies: Record<string, { name: string; symbol: string }>
  area: number
  timezones: string[]
}

export default function CountryPage() {
  const { code } = useParams()
  const router = useRouter()
  const { user, favorites, toggleFavorite } = useAuth()
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [borderCountries, setBorderCountries] = useState<{ name: string; code: string }[]>([])

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        const data = await response.json()
        setCountry(data[0])

        // Fetch border countries if available
        if (data[0]?.borders?.length) {
          const borderCodes = data[0].borders.join(",")
          const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`)
          const borderData = await borderResponse.json()

          setBorderCountries(
            borderData.map((country: any) => ({
              name: country.name.common,
              code: country.cca3,
            })),
          )
        }
      } catch (error) {
        console.error("Error fetching country:", error)
      } finally {
        setLoading(false)
      }
    }

    if (code) {
      fetchCountry()
    }
  }, [code])

  const isFavorite = favorites.includes(code as string)

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[300px] w-full rounded-lg" data-testid="skeleton" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" data-testid="skeleton" />
              <Skeleton className="h-6 w-1/2" data-testid="skeleton" />
              <Skeleton className="h-6 w-1/3" data-testid="skeleton" />
              <Skeleton className="h-6 w-2/3" data-testid="skeleton" />
              <Skeleton className="h-6 w-1/4" data-testid="skeleton" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Country not found</h2>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {user && (
            <Button
              variant={isFavorite ? "default" : "outline"}
              onClick={() => toggleFavorite(code as string)}
              className={isFavorite ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[300px] w-full overflow-hidden rounded-lg shadow-md">
            <Image
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
            <h2 className="text-xl text-muted-foreground mb-6">{country.name.official}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Capital:</span>
                  <span className="ml-2">{country.capital?.join(", ") || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Region:</span>
                  <span className="ml-2">{country.region}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Subregion:</span>
                  <span className="ml-2">{country.subregion || "N/A"}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Population:</span>
                  <span className="ml-2">{country.population.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Languages className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Languages:</span>
                  <span className="ml-2">
                    {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">Area:</span>
                  <span className="ml-2">{country.area.toLocaleString()} km²</span>
                </div>
              </div>
            </div>

            {country.currencies && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Currencies</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(country.currencies).map(([code, currency]) => (
                    <span key={code} className="px-3 py-1 bg-secondary rounded-full text-sm">
                      {currency.name} ({currency.symbol})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {borderCountries.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Border Countries</h3>
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((border) => (
                    <Button
                      key={border.code}
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/country/${border.code}`)}
                    >
                      {border.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
