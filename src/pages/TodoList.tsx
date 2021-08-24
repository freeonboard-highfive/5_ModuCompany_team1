import TodoItem from 'src/components/todoItem/TodoItem';
import React from 'react';
import TodoHeader from 'src/components/TodoHeader';
import styled from 'styled-components';
import { useTodo } from 'src/hooks/useTodo';
import useDragList from 'src/hooks/useDragList';

const TodoList: React.FC = () => {
  const { todos, createTodos, incrementId, deleteTodo, editTodo } = useTodo();
  const {
    lists,
    isDragging,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDragOver,
    handleDragDrop,
    dragItemIndex,
  } = useDragList(todos);

  return (
    <>
      <TodoHeader createTodos={createTodos} incrementId={incrementId} />
      <TodoLists>
        {todos &&
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
              <TodoItem
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
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
  margin-top: 25px;
  padding: 0px 25px;
`;

const TodoItemContainer = styled.li<{ isdragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 10px;
  width: 100%;
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
