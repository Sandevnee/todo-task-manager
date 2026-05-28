import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../components/TaskCard';

const mockTask = {
  id: 1,
  title: 'Buy milk',
  description: 'From the store',
  isCompleted: false,
};

describe('TaskCard', () => {
  it('should render task title and description', () => {
    render(<TaskCard task={mockTask} onMarkComplete={vi.fn()} />);

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByText('From the store')).toBeInTheDocument();
  });

  it('should render Done button', () => {
    render(<TaskCard task={mockTask} onMarkComplete={vi.fn()} />);

    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('should call onMarkComplete with task id when Done is clicked', () => {
    const mockOnMarkComplete = vi.fn();
    render(<TaskCard task={mockTask} onMarkComplete={mockOnMarkComplete} />);

    fireEvent.click(screen.getByText('Done'));

    expect(mockOnMarkComplete).toHaveBeenCalledWith(1);
  });
});