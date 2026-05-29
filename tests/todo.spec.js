const { test, expect } = require('@playwright/test');

test.describe('Todo Task Manager', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the app header correctly', async ({ page }) => {
    await expect(page.getByText('Task Manager')).toBeVisible();
    await expect(page.getByText('Stay Organized. Stay Ahead.')).toBeVisible();
  });

  test('should display the task form', async ({ page }) => {
    await expect(page.getByText('Create New Task')).toBeVisible();
    await expect(page.getByPlaceholder('Enter task title')).toBeVisible();
    await expect(page.getByPlaceholder('Enter task description')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Task' })).toBeVisible();
  });

  test('should display the task list panel', async ({ page }) => {
    await expect(page.getByText('Latest Tasks')).toBeVisible();
    await expect(page.getByText('Showing latest 5 active tasks')).toBeVisible();
  });

  test('should show validation errors when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Task' }).click();
    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('Description is required')).toBeVisible();
  });

  test('should show title error only when description is filled', async ({ page }) => {
    await page.getByPlaceholder('Enter task description').fill('Test description');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('Description is required')).not.toBeVisible();
  });

  test('should show description error only when title is filled', async ({ page }) => {
    await page.getByPlaceholder('Enter task title').fill('Test title');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await expect(page.getByText('Description is required')).toBeVisible();
    await expect(page.getByText('Title is required')).not.toBeVisible();
  });

  test('should successfully create a task', async ({ page }) => {
    await page.getByPlaceholder('Enter task title').fill('Buy groceries');
    await page.getByPlaceholder('Enter task description').fill('Milk, eggs, bread');
    await page.getByRole('button', { name: 'Add Task' }).click();

    await expect(page.getByText('Task Added!')).toBeVisible();
    await expect(page.locator('.task-card-title, h3').filter({ hasText: 'Buy groceries' }).first()).toBeVisible();
    await expect(page.getByText('Milk, eggs, bread')).toBeVisible();
  });

  test('should clear form after successful task creation', async ({ page }) => {
    await page.getByPlaceholder('Enter task title').fill('Buy groceries');
    await page.getByPlaceholder('Enter task description').fill('Milk, eggs, bread');
    await page.getByRole('button', { name: 'Add Task' }).click();

    await expect(page.getByText('Task Added!')).toBeVisible();
    await expect(page.getByPlaceholder('Enter task title')).toHaveValue('');
    await expect(page.getByPlaceholder('Enter task description')).toHaveValue('');
  });

  test('should mark a task as complete', async ({ page }) => {
    await page.getByPlaceholder('Enter task title').fill('Task to complete');
    await page.getByPlaceholder('Enter task description').fill('This will be completed');
    await page.getByRole('button', { name: 'Add Task' }).click();

    await expect(page.locator('.task-card-title, h3').filter({ hasText: 'Task to complete' }).first()).toBeVisible();

    await page.getByRole('button', { name: 'Done' }).first().click();

    await expect(page.getByText('Task Completed!')).toBeVisible();
    await expect(page.getByText('Task to complete')).not.toBeVisible();
  });

  test('should show empty state when no tasks', async ({ page, request }) => {
    let hasActiveTasks = true;

    while (hasActiveTasks) {
      const response = await request.get('http://localhost:3000/api/tasks');
      const body = await response.json();

      if (!body.data || body.data.length === 0) {
        hasActiveTasks = false;
        break;
      }

      for (const task of body.data) {
        await request.patch(`http://localhost:3000/api/tasks/${task.id}/done`);
      }
    }

    await page.reload();

    await expect(page.getByText('No active tasks yet')).toBeVisible();
  });

  test('should not show more than 5 tasks', async ({ page }) => {
    for (let i = 1; i <= 6; i++) {
      await page.getByPlaceholder('Enter task title').fill(`Task ${i}`);
      await page.getByPlaceholder('Enter task description').fill(`Description ${i}`);
      await page.getByRole('button', { name: 'Add Task' }).click();
      await expect(page.getByText('Task Added!')).toBeVisible();
    }

    const doneButtons = page.getByRole('button', { name: 'Done' });
    await expect(doneButtons).toHaveCount(5);
  });
});