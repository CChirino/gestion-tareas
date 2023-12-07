import { defineStore, acceptHMRUpdate } from 'pinia';

export const useBaseStore = defineStore({
  id: 'base',
  state: () => ({}),
  getters: {},
  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBaseStore, import.meta.hot));
}
