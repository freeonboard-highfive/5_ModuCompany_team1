import { TodoType } from 'src/utils/utilTypes';
import React, { useState } from 'react';
import styled from 'styled-components';
import EditTodo from './EditTodo';
import { FilledStar } from '../../assets/Stars';
import Status from '../status/Status';

interface TodoItemTypes {
  todo: TodoType;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, name: string, value: string | boolean) => void;
  updateStatus: (id: number, e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TodoItem: React.FC<TodoItemTypes> = ({ todo, deleteTodo, editTodo, updateStatus }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const toggleEditMode = (): void => {
    setEditMode(!editMode);
  };

  return (
    <Todo>
      <TodoContent>
        {editMode ? (
          <EditTodo
            toggleEditMode={toggleEditMode}
            editTodo={editTodo}
            todo={todo}
          />
        ) : (
          <>
            <TodoTextBox>
              <FilledStar />
              <TodoText>{todo.taskName}</TodoText>
            </TodoTextBox>
            <TodoButtonBox>
              <TodoButton className="edit" onClick={() => toggleEditMode()}>
                E
              </TodoButton>
              <Divider />
              <TodoButton
                className="delete"
                onClick={() => deleteTodo(todo.id)}
              >
                D
              </TodoButton>
            </TodoButtonBox>
          </>
        )}
      </TodoContent>
      <Status todo={todo} updateStatus={updateStatus} />
    </Todo>
  );
};

const Todo = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 10px;
  width: 100%;
`;

const TodoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);

  & svg {
    fill: black;
  }
`;

const TodoTextBox = styled.div`
  display: flex;
  align-items: center;
`;

const TodoText = styled.span`
  font-size: 16px;
  margin-left: 35px;
  margin-top: 5px;
`;

const TodoButtonBox = styled.div`
  display: flex;
  align-items: center;
  & .edit {
    color: #119955;
  }

  & .delete {
    color: #ff0000;
  }
`;

const Divider = styled.div`
  height: 14px;
  border-left: 1px solid black;
  margin: 0px 10px 5px;
`;

const TodoButton = styled.button`
  all: unset;
  font-size: 16px;
  padding: 5px;
  cursor: pointer;
`;

export default React.memo(TodoItem);
