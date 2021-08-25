import { TodoType } from 'src/utils/utilTypes';
import React, { useState } from 'react';
import styled from 'styled-components';
import EditTodo from './EditTodo';
import { FilledStar } from '../../assets/Stars';
import { useDispatch } from 'src/utils/context';
import Status from '../status/Status';

interface TodoItemTypes {
  todo: TodoType;
}

const TodoItem: React.FC<TodoItemTypes> = ({ todo }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggleEditMode = (): void => {
    setEditMode(!editMode);
  };

  return (
    <Todo>
      <TodoContent>
        {editMode ? (
          <EditTodo toggleEditMode={toggleEditMode} todo={todo} />
        ) : (
          <TodoTextBox>
            <FilledStar />
            <TextBox onClick={(): void => toggleEditMode()}>
              <TodoText>{todo.taskName}</TodoText>
            </TextBox>
          </TodoTextBox>
        )}
      </TodoContent>
      <DateBox>Date</DateBox>
      <ImportanceBox>ChangeState</ImportanceBox>
      <TodoButton
        onClick={(): void => dispatch({ type: 'DELETE', id: todo.id })}
      >
        D
      </TodoButton>
      <Status todo={todo} />
    </Todo>
  );
};

const Todo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 10px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
`;

const TodoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  padding: 15px;
  border-radius: 10px;

  & svg {
    fill: black;
  }
`;

const TodoTextBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 2.5px 0px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const TodoText = styled.span`
  font-size: 17px;
  margin-left: 35px;
  margin-top: 5px; ;
`;

const TodoButton = styled.button`
  all: unset;
  font-size: 16px;
  padding: 5px;
  color: #ff0000;
  cursor: pointer;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 56px;
  border-radius: 10px;
`;

const ImportanceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 56px;
  border-radius: 10px;
`;

export default React.memo(TodoItem);
