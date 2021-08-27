import { INITIAL_TODO, STORAGE_KEY } from './constants';
import { TodoType } from './utilTypes';

export const saveLocalStorage = (
  storageItem: TodoType[],
  storageKey: string = STORAGE_KEY,
): void => {
  const itemString = JSON.stringify(storageItem);
  localStorage.setItem(storageKey, itemString);
};

export const loadLocalStorage = (
  storageKey: string = STORAGE_KEY,
): TodoType[] => {
  const storageItem = localStorage.getItem(storageKey);
  if (storageItem === null) return INITIAL_TODO;

  return JSON.parse(storageItem);
};

export const incrementStorageId = (
  storageKey: string = STORAGE_KEY,
): number => {
  const lastTodos = loadLocalStorage(storageKey);
  if (!lastTodos.length) return 1;
  const lastTodosId = lastTodos[lastTodos.length - 1].id;
  return lastTodosId + 1;
};
