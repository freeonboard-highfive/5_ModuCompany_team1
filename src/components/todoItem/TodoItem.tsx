import { TodoType } from 'src/utils/utilTypes';
import React, { useState } from 'react';
import styled from 'styled-components';
import EditTodo from './EditTodo';
import { useDispatch } from 'src/utils/context';
import Status from '../status/Status';
import { STATUS, TODO_KEYS } from 'src/utils/constants';
import Important from '../important/Important';
import { Trash } from 'src/assets/Trash';
import DatePicker from 'react-datepicker';
import DateIcon from 'src/assets/DateIcon';
import { getDateString } from 'src/utils/getDateString';
import { ExampleCustomInput } from '../datePicker/DatePickerButton';

interface TodoItemTypes {
  todo: TodoType;
}

const TodoItem: React.FC<TodoItemTypes> = ({ todo }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggleEditMode = (): void => {
    setEditMode(!editMode);
  };

  const handleGoalDateChange = (date: Date) => {
    dispatch({
      type: 'EDIT',
      id: todo.id,
      name: TODO_KEYS.goalDate,
      value: getDateString(date),
    });
  };

  const handleDeleteItem = () => {
    if (window.confirm('정말 삭제하시겠습니까')) {
      dispatch({ type: 'DELETE', id: todo.id });
    }
  };

  return (
    <Todo>
      <TodoHeader>
        <Status todo={todo} />
        <Important todo={todo} />
      </TodoHeader>
      <TodoContainer status={todo.status}>
        <TodoTextContent>
          <TodoTextBox>
            <TextBox>
              {editMode ? (
                <EditTodo toggleEditMode={toggleEditMode} todo={todo} />
              ) : (
                <TodoText
                  status={todo.status}
                  onClick={(): void => toggleEditMode()}
                >
                  {todo.taskName}
                </TodoText>
              )}
              <TodoImportance>
                {todo.isImportant ? 'Important' : 'Not Important'}
              </TodoImportance>
            </TextBox>

            <TodoButton onClick={handleDeleteItem}>
              <Trash />
            </TodoButton>
          </TodoTextBox>
        </TodoTextContent>
      </TodoContainer>
      <TodoSubContent>
        <DateBox status={todo.status}>
          <DateIcon />
          <DatePicker
            selected={new Date(todo.goalDate)}
            onChange={handleGoalDateChange}
            customInput={<ExampleCustomInput />}
            closeOnScroll={true}
          />
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

const TodoText = styled.span<{ status: string }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.status === STATUS.FINISHED ? '#ddd' : '#223358')};
  text-decoration: ${(props) =>
    props.status === STATUS.FINISHED && 'line-through'};
`;

const TodoImportance = styled.div`
  font-size: 12px;
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

const DateBox = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: ${(props) => props.status === STATUS.FINISHED && '#ddd'};
  text-decoration: ${(props) =>
    props.status === STATUS.FINISHED && 'line-through'};
  width: 160px;

  & svg {
    fill: #b8bcca;
  }
`;

export default React.memo(TodoItem);
