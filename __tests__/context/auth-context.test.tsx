"use client"

import type React from "react"

import { act, renderHook } from "@testing-library/react"
import { AuthProvider, useAuth } from "@/context/auth-context"

describe("AuthContext", () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    window.localStorage.clear()
  })

  it("provides initial auth state", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.user).toBeNull()
    expect(result.current.favorites).toEqual([])
  })

  it("loads user and favorites from localStorage", () => {
    // Set up localStorage with user and favorites
    window.localStorage.setItem("user", JSON.stringify("test@example.com"))
    window.localStorage.setItem("favorites", JSON.stringify(["USA", "CAN"]))

    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>

    const { result } = renderHook(() => useAuth(), { wrapper })

    // Wait for useEffect to run
    act(() => {
      // Just a dummy act to ensure all effects have run
    })

    expect(result.current.user).toBe("test@example.com")
    expect(result.current.favorites).toEqual(["USA", "CAN"])
  })

  it("logs in a user", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login("test@example.com")
    })

    expect(result.current.user).toBe("test@example.com")
    expect(window.localStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify("test@example.com"))
  })

  it("registers a new user", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.register("new@example.com")
    })

    expect(result.current.user).toBe("new@example.com")
    expect(window.localStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify("new@example.com"))
  })

  it("logs out a user", () => {
    // Set up initial logged in state
    window.localStorage.setItem("user", JSON.stringify("test@example.com"))

    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>

    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => {
      result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(window.localStorage.removeItem).toHaveBeenCalledWith("user")
  })

  it("toggles favorites", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>

    const { result } = renderHook(() => useAuth(), { wrapper })

    // Add a favorite
    act(() => {
      result.current.toggleFavorite("USA")
    })

    expect(result.current.favorites).toContain("USA")

    // Remove the favorite
    act(() => {
      result.current.toggleFavorite("USA")
    })

    expect(result.current.favorites).not.toContain("USA")
  })
})
