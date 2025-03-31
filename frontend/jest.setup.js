// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock do nextjs router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/',
    route: '/',
    query: {},
  }),
  useParams: () => ({ id: '1' }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock do navigator.clipboard global
if (!window.navigator.clipboard) {
  Object.defineProperty(window.navigator, 'clipboard', {
    value: {
      writeText: jest.fn().mockImplementation(() => Promise.resolve()),
    },
    writable: true,
    configurable: true
  });
}

// Removendo os warnings do console durante os testes
jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {}); 