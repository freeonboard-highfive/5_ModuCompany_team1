import TodoItem from 'src/components/todoItem/TodoItem';
import React from 'react';
import TodoHeader from 'src/components/TodoHeader';
import { useTodo } from 'src/utils/useTodo';
import styled from 'styled-components';

const TodoList: React.FC = () => {
  const { todos, createTodos, incrementId, deleteTodo, editTodo } = useTodo();
  return (
    <>
      <TodoHeader createTodos={createTodos} incrementId={incrementId} />
      <TodoLists>
        {todos &&
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
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

export default React.memo(TodoList);
