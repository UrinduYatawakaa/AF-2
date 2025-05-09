import { render, screen, fireEvent } from "@testing-library/react"
import { CountryCard } from "@/components/country-card"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { mockCountries } from "../mocks/countryData"

// Mock the auth context
jest.mock("@/context/auth-context", () => ({
  useAuth: jest.fn(),
}))

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("CountryCard Component", () => {
  const mockRouter = {
    push: jest.fn(),
  }

  const mockAuthContext = {
    user: "test@example.com",
    favorites: ["USA"],
    toggleFavorite: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useAuth as jest.Mock).mockReturnValue(mockAuthContext)
  })

  it("renders country information correctly", () => {
    const country = mockCountries[0]

    render(<CountryCard country={country} />)

    // Check if country name is displayed
    expect(screen.getByText(country.name.common)).toBeInTheDocument()

    // Check if capital is displayed
    expect(screen.getByText(`Capital: ${country.capital[0]}`)).toBeInTheDocument()

    // Check if region is displayed
    expect(screen.getByText(`Region: ${country.region}`)).toBeInTheDocument()

    // Check if population is displayed
    expect(screen.getByText(`Population: ${country.population.toLocaleString()}`)).toBeInTheDocument()

    // Check if the flag image is rendered
    const flagImage = screen.getByAltText(`Flag of ${country.name.common}`)
    expect(flagImage).toBeInTheDocument()
    expect(flagImage).toHaveAttribute("src", country.flags.svg)
  })

  it("navigates to country details page when clicked", () => {
    const country = mockCountries[0]

    render(<CountryCard country={country} />)

    // Click on the card
    fireEvent.click(screen.getByText(country.name.common))

    // Check if router.push was called with the correct path
    expect(mockRouter.push).toHaveBeenCalledWith(`/country/${country.cca3}`)
  })

  it("toggles favorite status when heart button is clicked", () => {
    const country = mockCountries[0]

    render(<CountryCard country={country} />)

    // Find and click the heart button
    const heartButton = screen.getByRole("button", { name: /remove from favorites/i })
    fireEvent.click(heartButton)

    // Check if toggleFavorite was called with the correct country code
    expect(mockAuthContext.toggleFavorite).toHaveBeenCalledWith(country.cca3)
  })

  // it("redirects to login page when heart button is clicked and user is not logged in", async () => {
  //   // Override auth context to simulate user not logged in
  //   (useAuth as jest.Mock).mockReturnValue({
  //     ...mockAuthContext,
  //     user: null,
  //   });

  //   const country = mockCountries[0];
  //   render(<CountryCard country={country} />);

  //   // Find and click the heart button
  //   const heartButton = screen.getByRole("button", { name: /add to favorites/i });
  //   fireEvent.click(heartButton);

  //   // Check if router.push was called with the login path
  //   expect(mockRouter.push).toHaveBeenCalledWith("/login");
  // });
})
