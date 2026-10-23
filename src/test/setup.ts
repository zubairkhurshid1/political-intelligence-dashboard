import '@testing-library/jest-dom';

// Mock ResizeObserver which is not available in jsdom but used by Recharts
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
