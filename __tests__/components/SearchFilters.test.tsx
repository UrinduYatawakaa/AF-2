import { render, screen, fireEvent } from "@testing-library/react"
import { SearchFilters } from "@/components/search-filters"
import { useRouter, useSearchParams } from "next/navigation"

// Mock the router and search params
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { languages: { eng: "English" } },
        { languages: { deu: "German" } },
        { languages: { fra: "French" } },
        { languages: { spa: "Spanish" } },
        { languages: { jpn: "Japanese" } },
      ]),
  }),
) as jest.Mock

describe("SearchFilters Component", () => {
  const mockRouter = {
    push: jest.fn(),
  }

  const mockSearchParams = {
    get: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)

    // Default behavior for search params
    mockSearchParams.get.mockImplementation((param) => {
      if (param === "search") return ""
      if (param === "region") return ""
      if (param === "language") return ""
      return null
    })
  })

  it("renders search input and filter dropdowns", async () => {
    render(<SearchFilters />)

    // Check if search input is rendered
    expect(screen.getByPlaceholderText("Search for a country...")).toBeInTheDocument()

    // Check if region filter is rendered
    expect(screen.getByText("Filter by Region")).toBeInTheDocument()

    // Check if language filter is rendered
    expect(screen.getByText("Filter by Language")).toBeInTheDocument()

    // Check if buttons are rendered
    expect(screen.getByRole("button", { name: /apply filters/i })).toBeInTheDocument()
  })

  it("updates URL with search parameters when form is submitted", async () => {
    render(<SearchFilters />)

    // Enter search term
    const searchInput = screen.getByPlaceholderText("Search for a country...")
    fireEvent.change(searchInput, { target: { value: "United" } })

    // Submit the form
    const applyButton = screen.getByRole("button", { name: /apply filters/i })
    fireEvent.click(applyButton)

    // Check if router.push was called with the correct search params
    expect(mockRouter.push).toHaveBeenCalledWith("/?search=United")
  })

  it("clears filters when clear button is clicked", async () => {
    // Set up initial search params
    mockSearchParams.get.mockImplementation((param) => {
      if (param === "search") return "United"
      if (param === "region") return "Americas"
      if (param === "language") return "English"
      return null
    })

    render(<SearchFilters />)

    // Find and click the clear button
    const clearButton = screen.getByRole("button", { name: /clear filters/i })
    fireEvent.click(clearButton)

    // Check if router.push was called with empty params
    expect(mockRouter.push).toHaveBeenCalledWith("/")
  })

  it("fetches languages on mount", async () => {
    render(<SearchFilters />)

    // Check if fetch was called
    expect(global.fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/all?fields=languages")
  })
})
