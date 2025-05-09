"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [region, setRegion] = useState(searchParams.get("region") || "")
  const [language, setLanguage] = useState(searchParams.get("language") || "")
  const [languages, setLanguages] = useState<string[]>([])
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(false)

  // Fetch all languages for the filter
  useEffect(() => {
    const fetchLanguages = async () => {
      setIsLoadingLanguages(true)
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=languages")
        const data = await response.json()

        // Extract all languages and remove duplicates
        const allLanguages = data.reduce((acc: string[], country: any) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang: any) => {
              if (!acc.includes(lang)) {
                acc.push(lang as string)
              }
            })
          }
          return acc
        }, [])

        // Sort languages alphabetically
        allLanguages.sort()
        setLanguages(allLanguages)
      } catch (error) {
        console.error("Error fetching languages:", error)
      } finally {
        setIsLoadingLanguages(false)
      }
    }

    fetchLanguages()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters()
  }

  const updateFilters = () => {
    const params = new URLSearchParams()

    if (search) params.set("search", search)
    if (region) params.set("region", region)
    if (language) params.set("language", language)

    router.push(`/?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch("")
    setRegion("")
    setLanguage("")
    router.push("/")
  }

  const hasFilters = search || region || language

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for a country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:w-2/5">
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Africa">Africa</SelectItem>
                <SelectItem value="Americas">Americas</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Oceania">Oceania</SelectItem>
              </SelectContent>
            </Select>

            <Select value={language} onValueChange={setLanguage} disabled={isLoadingLanguages}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="submit" variant="default">
            Apply Filters
          </Button>

          {hasFilters && (
            <Button type="button" variant="outline" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
