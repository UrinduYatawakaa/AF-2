import { Navbar } from "@/components/navbar"
import { CountriesGrid } from "@/components/countries-grid"
import { SearchFilters } from "@/components/search-filters"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Explore Countries Around the World</h1>
        <SearchFilters />
        <CountriesGrid />
      </div>
    </main>
  )
}
