import React from 'react';
import TodoHeader from 'src/components/TodoHeader';
import { useTodo } from 'src/utils/useTodo';
import Filter from 'src/components/filter/Filter';


const TodoList: React.FC = () => {
  const { todos, createTodos, incrementId, deleteTodo, editTodo } = useTodo();

  return (
    <>
      <TodoHeader createTodos={createTodos} incrementId={incrementId} />
      <Filter _todos={todos} deleteTodo={deleteTodo} editTodo={editTodo}/>
    </>
  );
};

export default React.memo(TodoList);
