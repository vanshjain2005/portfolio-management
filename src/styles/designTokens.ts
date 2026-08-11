import React from 'react';

export type Theme = 'light' | 'dark' | 'system';

export function ThemeProvider({ children }: { children: React.ReactNode; theme?: Theme }) {
  return React.createElement(React.Fragment, null, children);
}