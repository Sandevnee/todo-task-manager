import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  it('should render form elements correctly', () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);

    expect(screen.getByText('Create New Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter task description')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  it('should show title error when title is empty', async () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);

    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });
  });

  it('should show description error when description is empty', async () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('Enter task title'), {
      target: { value: 'Buy milk' },
    });

    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(screen.getByText('Description is required')).toBeInTheDocument();
    });
  });

  it('should show both errors when both fields are empty', async () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);

    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
    });
  });

  it('should clear title error when user starts typing', async () => {
    render(<TaskForm onTaskCreated={vi.fn()} />);

    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Enter task title'), {
      target: { value: 'Buy milk' },
    });

    await waitFor(() => {
      expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
    });
  });

  it('should call onTaskCreated with title and description on valid submit', async () => {
    const mockOnTaskCreated = vi.fn().mockResolvedValue({});
    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    fireEvent.change(screen.getByPlaceholderText('Enter task title'), {
      target: { value: 'Buy milk' },
    });

    fireEvent.change(screen.getByPlaceholderText('Enter task description'), {
      target: { value: 'From the store' },
    });

    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(mockOnTaskCreated).toHaveBeenCalledWith('Buy milk', 'From the store');
    });
  });

  it('should clear inputs after successful submit', async () => {
    const mockOnTaskCreated = vi.fn().mockResolvedValue({});
    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    fireEvent.change(screen.getByPlaceholderText('Enter task title'), {
      target: { value: 'Buy milk' },
    });

    fireEvent.change(screen.getByPlaceholderText('Enter task description'), {
      target: { value: 'From the store' },
    });

    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter task title').value).toBe('');
      expect(screen.getByPlaceholderText('Enter task description').value).toBe('');
    });
  });
});