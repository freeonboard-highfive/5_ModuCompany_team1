import { INITAILTODO } from './constants';
import { TodoType } from './utilTypes';

export const saveLocalStorage = (
  storageKey: string,
  strorageItem: TodoType[],
): void => {
  const itemString = JSON.stringify(strorageItem);
  localStorage.setItem(storageKey, itemString);
};

export const loadLocalStorage = (storageKey: string): TodoType[] | void => {
  const storageItem = localStorage.getItem(storageKey);
  if (storageItem === null) return saveLocalStorage(storageKey, INITAILTODO);
  return JSON.parse(storageItem);
};
