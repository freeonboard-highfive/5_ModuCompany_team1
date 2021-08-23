import { useEffect, useState } from 'react';
import { INITAILTODO } from './constants';
import {
  increamentStorageId,
  loadLocalStorage,
  saveLocalStorage,
} from './localStorage';
import { TodoType, UseTodoTypes } from './utilTypes';

export const useTodo = (): UseTodoTypes => {
  const [todos, setTodos] = useState<TodoType[]>(INITAILTODO);

  useEffect(() => {
    setTodos(loadLocalStorage());
  }, []);

  useEffect(() => {
    saveLocalStorage(todos);
  }, [todos]);

  const incrementId = (): number => {
    if (!todos.length) return 1;
    return increamentStorageId();
  };

  const createTodos = (todos: TodoType): void => {
    setTodos((prev) => prev.concat(todos));
  };

  return { createTodos, incrementId };
};
