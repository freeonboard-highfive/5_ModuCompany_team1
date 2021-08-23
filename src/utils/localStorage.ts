import { INITAILTODO, STORAGE_KEY } from './constants';
import { TodoType } from './utilTypes';

export const saveLocalStorage = (
  strorageItem: TodoType[],
  storageKey: string = STORAGE_KEY,
): void => {
  const itemString = JSON.stringify(strorageItem);
  localStorage.setItem(storageKey, itemString);
};

export const loadLocalStorage = (
  storageKey: string = STORAGE_KEY,
): TodoType[] => {
  const storageItem = localStorage.getItem(storageKey);
  if (storageItem === null) return INITAILTODO;
  return JSON.parse(storageItem);
};

export const increamentStorageId = (
  storageKey: string = STORAGE_KEY,
): number => {
  const lastTodos = loadLocalStorage(storageKey);
  const lastTodosId = lastTodos[lastTodos.length - 1].id;
  return lastTodosId + 1;
};
