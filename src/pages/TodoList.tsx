import React from 'react';
import TodoHeader from 'src/components/TodoHeader';
import Filter from 'src/components/filter/Filter';
import { useTodo } from 'src/hooks/useTodo';


const TodoList: React.FC = () => {
  const { todos, createTodos, incrementId, deleteTodo, editTodo, updateStatus } = useTodo();
  return (
    <>
      <TodoHeader createTodos={createTodos} incrementId={incrementId} />
      <Filter _todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} updateStatus={updateStatus}/>
    </>
  );
};

export default React.memo(TodoList);