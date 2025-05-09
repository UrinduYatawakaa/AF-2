// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const mockPush = jest.fn();
const mockBack = jest.fn();
const mockReplace = jest.fn();
const mockRefresh = jest.fn();
const mockPrefetch = jest.fn();
const mockUsePathname = jest.fn(() => "/"); // Default pathname
const mockGetQueryParam = jest.fn();
const mockUseSearchParams = jest.fn(() => ({ get: mockGetQueryParam }));
const mockUseParams = jest.fn(() => ({ code: "USA" })); // Default params

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
    replace: mockReplace,
    refresh: mockRefresh,
    prefetch: mockPrefetch,
  }),
  usePathname: mockUsePathname,
  useSearchParams: mockUseSearchParams,
  useParams: mockUseParams,
  redirect: jest.fn(),
  notFound: jest.fn(),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString()
    }),
    removeItem: jest.fn((key) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

// Mock fetch
global.fetch = jest.fn()
