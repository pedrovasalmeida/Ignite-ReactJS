import { useTheme } from '../context/ThemeContext';

import '../styles/header.scss';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme === 'light' ? 'header' : 'header-dark'}>
      <div>
        <img src="/logo.svg" alt="to.do" />
        <button type="button" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    </header>
  );
}
