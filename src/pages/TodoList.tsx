import TodoItem from 'src/components/todoItem/TodoItem';
import React, { useCallback, useEffect } from 'react';
import TodoHeader from 'src/components/TodoHeader/TodoHeader';
import styled from 'styled-components';
import { useDispatch, useTodoState } from 'src/utils/context';
import { loadLocalStorage, saveLocalStorage } from 'src/utils/localStorage';
import useDragList from 'src/hooks/useDragList';

const TodoList: React.FC = () => {
  const todoState = useTodoState();
  const dispatch = useDispatch();
  const {
    lists,
    isDragging,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDragOver,
    handleDragDrop,
    dragItemIndex,
  } = useDragList(todoState);

  const loadData = useCallback((): void => {
    const loadedTodos = loadLocalStorage();
    dispatch({ type: 'LOAD', todoState: loadedTodos });
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
      <TodoLists>
        {todoState &&
          lists &&
          lists.map((todo, index) => (
            <TodoItemContainer
              key={todo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={
                isDragging ? (e) => handleDragEnter(e, index) : () => {}
              }
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDrop={handleDragDrop}
              isdragging={dragItemIndex.current === index}
            >
              <TodoItem todo={todo} />
            </TodoItemContainer>
          ))}
      </TodoLists>
    </>
  );
};

const TodoLists = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 125px 25px 0px;
`;

const TodoItemContainer = styled.li<{ isdragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.isdragging && 'lightgray'};

  :not(:last-of-type) {
    margin-bottom: 0.5rem;
  }

  * {
    margin: 0;
    font-size: 1.2rem;
  }
`;

export default React.memo(TodoList);
