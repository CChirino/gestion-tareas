import { defineStore } from 'pinia';
import { Task } from './../models/task.models';
import { generateID, sleep } from './../utils';

interface TodoState {
  tasks: Task[];
  loading: boolean;
}

interface TodoActions {
  addTask(name: string): Promise<void>;
  deleteTask(id: string): Promise<void>;
  updateTask(id: string): Promise<void>;
}

export const useTodoStore = defineStore<TodoState, {}, TodoActions>({
  id: 'todo',
  state: (): TodoState => ({
    tasks: [],
    loading: false,
  }),
  actions: {
    async addTask(name: string): Promise<void> {
      this.loading = true;
      const newTask: Task = { name, done: false, id: generateID() };
      this.tasks.push(newTask);
      await sleep(1000);
      this.loading = false;
    },
    async deleteTask(id: string): Promise<void> {
      this.loading = true;
      this.tasks = this.tasks.filter((task) => task.id !== id);
      await sleep(1000);
      this.loading = false;
    },
    async updateTask(id: string): Promise<void> {
      this.loading = true;
      const taskIndex = this.tasks.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        this.tasks[taskIndex].done = !this.tasks[taskIndex].done;
      }

      await sleep(1000);
      this.loading = false;
    },
  },
});