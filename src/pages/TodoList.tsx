import React from 'react';
import TodoHeader from 'src/components/TodoHeader';
import { useTodo } from 'src/utils/useTodo';

const TodoList: React.FC = () => {
  const { createTodos, incrementId } = useTodo();
  return (
    <>
      <TodoHeader incrementId={incrementId} createTodos={createTodos} />
    </>
  );
};

export default TodoList;
