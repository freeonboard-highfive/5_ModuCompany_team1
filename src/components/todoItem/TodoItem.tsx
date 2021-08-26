import { TodoType } from 'src/utils/utilTypes';
import React, { useState } from 'react';
import styled from 'styled-components';
import EditTodo from './EditTodo';
import { FilledStar } from '../../assets/Stars';
import { useDispatch } from 'src/utils/context';
import Status from '../status/Status';
import { STATUS } from 'src/utils/constants';
import Date from 'src/assets/Date';

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
      <TodoHeader>
        <Status todo={todo} />
        <FilledStar />
      </TodoHeader>
      <TodoContainer status={todo.status}>
        <TodoTextContent>
          <TodoTextBox>
            <TextBox>
              {editMode ? (
                <EditTodo toggleEditMode={toggleEditMode} todo={todo} />
              ) : (
                <TodoText onClick={(): void => toggleEditMode()}>
                  {todo.taskName}
                </TodoText>
              )}
              <TodoImportance>
                {todo.isImportant ? 'Important' : 'Not Important'}
              </TodoImportance>
            </TextBox>

            <TodoButton
              onClick={(): void => dispatch({ type: 'DELETE', id: todo.id })}
            >
              D
            </TodoButton>
          </TodoTextBox>
        </TodoTextContent>
      </TodoContainer>
      <TodoSubContent>
        <DateBox>
          <Date />
          {todo.goalDate}
        </DateBox>
      </TodoSubContent>
    </Todo>
  );
};

const Todo = styled.div`
  width: 100%;
  margin-top: 15px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;

  padding: 8px 0;
  padding-right: 16px;
  border-bottom: 1px solid #eff0f4;
`;

const TodoContainer = styled.div<{ status: string }>`
  flex-direction: column;
  margin: 16px 0;
  padding: 0 16px;
  border-left: 4px solid
    ${(props) =>
      props.status === STATUS.ONGOING
        ? '#5457c2'
        : props.status === STATUS.NOT_STARTED
        ? '#5ebb9d'
        : '#ddd'};
`;

const TodoTextContent = styled.div`
  & svg {
    fill: black;
  }
`;

const TodoTextBox = styled.div`
  display: flex;
  align-items: space-between;
  width: 100%;
  padding: 2.5px 0px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TodoText = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const TodoImportance = styled.div`
  font-size: 14px;
  padding-top: 4px;
  color: #b8bdca;
`;

const TodoSubContent = styled.div`
  display: flex;
  margin-top: 12px;
`;

const TodoButton = styled.button`
  all: unset;
  font-size: 16px;
  width: 16px;
  height: 16px;
  color: #ff0000;
  cursor: pointer;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;

  & svg {
    fill: #b8bcca;
    margin-right: 8px;
  }
`;

export default React.memo(TodoItem);
