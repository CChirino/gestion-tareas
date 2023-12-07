import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App', () => {
  it('creates a new task', () => {
    const wrapper = mount(App);
    const input = wrapper.find('.form-task__input');
    const button = wrapper.find('.form-task__button');

    input.setValue('New Task');
    button.trigger('click');

    expect(wrapper.vm.todoStore.tasks).toHaveLength(1);
    expect(wrapper.vm.todoStore.tasks[0].name).toBe('New Task');
  });

  it('deletes a task', () => {
    const wrapper = mount(App);
    wrapper.vm.todoStore.tasks = [
      { id: '1', name: 'Task 1', done: false },
      { id: '2', name: 'Task 2', done: false },
    ];

    const deleteButton = wrapper.find('.card-task__button');
    deleteButton.trigger('click');

    expect(wrapper.vm.todoStore.tasks).toHaveLength(1);
    expect(wrapper.vm.todoStore.tasks[0].name).toBe('Task 1');
  });

  it('updates the status of a task', () => {
    const wrapper = mount(App);
    wrapper.vm.todoStore.tasks = [
      { id: '1', name: 'Task 1', done: false },
    ];

    const checkbox = wrapper.find('.card-task__checkbox');
    checkbox.trigger('click');

    expect(wrapper.vm.todoStore.tasks[0].done).toBe(true);
  });
});