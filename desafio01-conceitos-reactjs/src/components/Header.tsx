import Switch from 'react-switch';

import { useTheme } from '../context/ThemeContext';

import '../styles/header.scss';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme === 'light' ? 'header' : 'header-dark'}>
      <div>
        <img src="/logo.svg" alt="to.do" />
        <div className="switcher">
          <Switch
            onChange={toggleTheme}
            checked={theme === 'light' ? false : true}
            uncheckedIcon={false}
            checkedIcon={false}
            onColor="#3fad27"
            width={40}
            height={15}
            handleDiameter={15}
          />
        </div>
      </div>
    </header>
  );
}
