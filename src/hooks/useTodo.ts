import { useEffect, useState } from 'react';
import { INITIALTODO } from 'src/utils/constants';
import { getTodayDate } from 'src/utils/getTodayDate';
import {
  increamentStorageId,
  loadLocalStorage,
  saveLocalStorage,
} from 'src/utils/localStorage';
import { TodoType, UseTodoTypes } from 'src/utils/utilTypes';

export const useTodo = (): UseTodoTypes => {
  const [todos, setTodos] = useState<TodoType[]>(INITIALTODO);

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

  const deleteTodo = (id: number): void => {
    const deletedTodo = todos.filter((todo) => id !== todo.id);
    setTodos(deletedTodo);
  };

  const editTodo = (
    id: number,
    name: string,
    value: string | boolean,
  ): void => {
    const editedTodo = todos.map((todo) =>
      id !== todo.id
        ? todo
        : {
            ...todo,
            [name]: value,
            updatedAt: getTodayDate(),
          },
    );
    setTodos(editedTodo);
  };

  return { createTodos, incrementId, deleteTodo, editTodo, todos };
};
