import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';
import { AiOutlineClear } from 'react-icons/ai';
import { useTheme } from '../context/ThemeContext';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const { theme } = useTheme();

  function handleCreateNewTask() {
    if (newTaskTitle) {
      setTasks([
        ...tasks,
        {
          id: Math.random() * 1001,
          title: newTaskTitle,
          isComplete: false,
        },
      ]);

      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const taskCompleted = tasks.map((item) =>
      item.id === id ? { ...item, isComplete: !item.isComplete } : item
    );

    setTasks(taskCompleted);
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((item: Task) => item.id !== id);

    setTasks(filteredTasks);
  }

  function handleClearAllTasks() {
    setTasks([]);
  }

  return (
    <section
      className={
        theme === 'light' ? 'task-list container' : 'task-list-dark container'
      }
    >
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          {tasks.length > 1 && (
            <button
              type="submit"
              className="clear-all"
              onClick={handleClearAllTasks}
            >
              Limpar tudo
              <AiOutlineClear size={16} color="#fff" />
            </button>
          )}
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
