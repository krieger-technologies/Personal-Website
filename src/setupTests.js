// jest-dom adds custom matchers for asserting on DOM nodes,
// e.g. expect(element).toHaveTextContent(/react/i)
// https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// plotly.js is huge and probes <canvas> at import time (jsdom has no canvas).
// No test renders a chart, so stub the slim Plot wrapper globally.
vi.mock('./components/cards/Plot', () => ({ default: () => null }));
