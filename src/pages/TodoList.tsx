import React, { useCallback, useEffect } from 'react';
import TodoHeader from 'src/components/TodoHeader/TodoHeader';
import { useDispatch, useTodoState } from 'src/utils/context';
import { loadLocalStorage, saveLocalStorage } from 'src/utils/localStorage';
import Filter from 'src/components/filter/Filter';

const TodoList: React.FC = () => {
  const todoState = useTodoState();
  const dispatch = useDispatch();

  const loadData = useCallback((): void => {
    const loadedTodos = loadLocalStorage();
    dispatch({ type: 'SET', todoState: loadedTodos });
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    saveLocalStorage(todoState);
  }, [todoState]);

  return (
    <>
      <TodoHeader />
      <Filter _todos={todoState} />
    </>
  );
};

export default React.memo(TodoList);
