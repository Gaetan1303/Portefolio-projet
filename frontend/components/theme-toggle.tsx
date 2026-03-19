'use client';

import { useEffect, useState } from 'react';

/** The two supported colour schemes. */
type Theme = 'gaetan_light' | 'gaetan_dark';

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
  const [theme, setTheme] = useState<Theme>('gaetan_dark');

  useEffect(() => {
    const initial = (localStorage.getItem('theme') as Theme | null) ?? 'gaetan_dark';
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  /**
   * Switches the active theme to the opposite value, updates the DOM
   * attribute and persists the choice to `localStorage`.
   */
  const toggleTheme = () => {
    const next: Theme = theme === 'gaetan_dark' ? 'gaetan_light' : 'gaetan_dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      className="btn btn-outline btn-sm"
      onClick={toggleTheme}
      aria-label={theme === 'gaetan_dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      {theme === 'gaetan_dark' ? 'Mode clair' : 'Mode sombre'}
    </button>
  );
}
