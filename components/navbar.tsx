"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/context/auth-context"
import { Menu, X, Globe, Heart, LogIn, LogOut } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
             <Image
              src="/county.png"
              alt="Logo"
              width={28}
              height={28}
              className="text-primary"
             />
              <span className="text-xl font-bold">GoCounty</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className={`hover:text-primary ${pathname === "/" ? "text-primary font-medium" : ""}`}>
              Home
            </Link>
            {user && (
              <Link
                href="/favorites"
                className={`flex items-center hover:text-primary ${pathname === "/favorites" ? "text-primary font-medium" : ""}`}
              >
                <Heart className="mr-1 h-4 w-4" />
                Favorites
              </Link>
            )}
            <div className="ml-4 flex items-center space-x-2">
              <ModeToggle />
              {user ? (
                <Button variant="outline" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Link href="/login">
                  <Button variant="default">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className={`block py-2 hover:text-primary ${pathname === "/" ? "text-primary font-medium" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            {user && (
              <Link
                href="/favorites"
                className={`flex items-center py-2 hover:text-primary ${pathname === "/favorites" ? "text-primary font-medium" : ""}`}
                onClick={closeMenu}
              >
                <Heart className="mr-2 h-4 w-4" />
                Favorites
              </Link>
            )}
            <div className="pt-2 border-t">
              {user ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Link href="/login" className="w-full block" onClick={closeMenu}>
                  <Button className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
