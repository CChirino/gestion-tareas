import App from '@/App.vue';

describe('App', () => {
  test('createTask should add a new task', async () => {
    // Mock del objeto todoStore
    const todoStore = {
      tasks: [],
      addTask: jest.fn(),
    };

    // Crear una instancia de App.vue
    const app = new App({
      data() {
        return {
          todoStore,
        };
      },
    });

    // Simular entrada de datos
    app.$refs = {
      input: {
        value: 'New Task',
      },
    };

    // Simular clic en el botón
    await app.createTask();

    // Verificar que la tarea se agregó correctamente
    expect(todoStore.addTask).toHaveBeenCalledWith('New Task');
    expect(todoStore.tasks).toContainEqual({ name: 'New Task', done: false });
  });

  test('deleteTask should remove a task', async () => {
    // Mock del objeto todoStore
    const todoStore = {
      tasks: [{ name: 'Task to delete', done: false }],
      deleteTask: jest.fn(),
    };

    // Crear una instancia de App.vue
    const app = new App({
      data() {
        return {
          todoStore,
        };
      },
    });

    // Simular clic en el botón de eliminar
    await app.deleteTask(0);

    // Verificar que la tarea se eliminó correctamente
    expect(todoStore.deleteTask).toHaveBeenCalledWith(0);
    expect(todoStore.tasks).not.toContainEqual({ name: 'Task to delete', done: false });
  });

  test('updateTask should update the status of a task', async () => {
    // Mock del objeto todoStore
    const todoStore = {
      tasks: [{ name: 'Task to update', done: false }],
      updateTask: jest.fn(),
    };

    // Crear una instancia de App.vue
    const app = new App({
      data() {
        return {
          todoStore,
        };
      },
    });

    // Simular clic en el checkbox
    await app.updateTask(0);

    // Verificar que el estado de la tarea se actualizó correctamente
    expect(todoStore.updateTask).toHaveBeenCalledWith(0);
    expect(todoStore.tasks).toContainEqual({ name: 'Task to update', done: true });
  });
});