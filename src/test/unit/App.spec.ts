import { createPinia, Pinia, defineStore, setActivePinia } from 'pinia';

// Definir las tareas
const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    tasks: [] as { name: string; done: boolean }[],
  }),
  actions: {
    addTask(newTaskName: string) {
      this.tasks.push({
        name: newTaskName,
        done: false,
      });
    },
    deleteTask(index: number) {
      this.tasks.splice(index, 1);
    },
    updateTask(index: number, updatedTask: { name: string; done: boolean }) {
      this.tasks.splice(index, 1, updatedTask);
    },
  },
});

describe('todo store', () => {
  let pinia: Pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('adds a new task', async () => {
    const store = useTodoStore(pinia);
    const initialTasksLength = store.tasks.length;
    const newTaskName = 'Learn Jest';

    await store.addTask(newTaskName);

    const updatedTasksLength = store.tasks.length;

    expect(store.tasks[updatedTasksLength - 1].name).toBe(newTaskName);
    expect(store.tasks[updatedTasksLength - 1].done).toBe(false);
  });

  it('deletes a task', async () => {
    const store = useTodoStore(pinia);
    store.tasks = [
      { name: 'Task 1', done: false },
      { name: 'Task 2', done: true },
      { name: 'Task 3', done: false },
    ];
    const initialTasksLength = store.tasks.length;
    const taskIndex = 1;
  
    await store.deleteTask(taskIndex);
  
    expect(store.tasks.length).toBe(initialTasksLength - 1);
    expect(store.tasks).toEqual(expect.arrayContaining([
      { name: 'Task 1', done: false },
      { name: 'Task 3', done: false },
    ]));
  });

  it('updates a task', async () => {
    const store = useTodoStore(pinia);
    store.tasks = [
      { name: 'Task 1', done: false },
      { name: 'Task 2', done: true },
      { name: 'Task 3', done: false },
    ];
    const taskIndex = 0;
    const updatedTask = { name: 'Updated Task', done: true };

    await store.updateTask(taskIndex, updatedTask);

    expect(store.tasks[taskIndex]).toEqual(updatedTask);
  });
});