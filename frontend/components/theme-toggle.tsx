'use client';

import { useEffect, useState } from 'react';

/** The two supported colour schemes. */
type Theme = 'light' | 'dark';

/**
 * Button that toggles between light and dark colour schemes.
 *
 * On first mount the component reads the persisted preference from
 * `localStorage` (key: `"theme"`) and applies it to the `<html>` element
 * via `data-theme`. Subsequent clicks flip the theme and persist the new
 * value so the choice survives page reloads.
 *
 * @returns A `<button>` element with an accessible label reflecting the
 *          current theme state
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const initial = (localStorage.getItem('theme') as Theme | null) ?? 'dark';
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  /**
   * Switches the active theme to the opposite value, updates the DOM
   * attribute and persists the choice to `localStorage`.
   */
  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}>
      {theme === 'dark' ? 'Passer en clair' : 'Passer en sombre'}
    </button>
  );
}
