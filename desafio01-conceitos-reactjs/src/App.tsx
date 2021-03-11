import { TaskList } from './components/TaskList';
import { Header } from './components/Header';

import { useTheme } from './context/ThemeContext';

import './styles/global.scss';

export function App() {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'root-dark' : ''}>
      <Header />
      <TaskList />
    </div>
  );
}
