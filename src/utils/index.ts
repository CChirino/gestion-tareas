export const generateID = (): string =>
  window.URL.createObjectURL(new Blob([])).slice(-35);

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
