import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';

const mockTasks = [
  { id: 1, title: 'Buy milk', description: 'From the store', isCompleted: false },
  { id: 2, title: 'Clean home', description: 'Clean the bedroom', isCompleted: false },
];

describe('TaskList', () => {
  it('should render empty state when no tasks', () => {
    render(<TaskList tasks={[]} onMarkComplete={vi.fn()} />);

    expect(screen.getByText('No active tasks yet')).toBeInTheDocument();
    expect(screen.getByText('Create your first task to get started')).toBeInTheDocument();
  });

  it('should render list of tasks', () => {
    render(<TaskList tasks={mockTasks} onMarkComplete={vi.fn()} />);

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByText('Clean home')).toBeInTheDocument();
  });

  it('should render correct number of task cards', () => {
    render(<TaskList tasks={mockTasks} onMarkComplete={vi.fn()} />);

    const doneButtons = screen.getAllByText('Done');
    expect(doneButtons).toHaveLength(2);
  });

  it('should render Latest Tasks heading', () => {
    render(<TaskList tasks={mockTasks} onMarkComplete={vi.fn()} />);

    expect(screen.getByText('Latest Tasks')).toBeInTheDocument();
  });

  it('should render showing latest 5 tasks message', () => {
    render(<TaskList tasks={mockTasks} onMarkComplete={vi.fn()} />);

    expect(screen.getByText('Showing latest 5 active tasks')).toBeInTheDocument();
  });
});