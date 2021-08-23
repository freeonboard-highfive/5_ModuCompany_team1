import React, { useState } from 'react';
import { IMPORTANCE, STATUS } from 'src/utils/constants';
import { TodoType } from 'src/utils/utilTypes';
import styled from 'styled-components';
import Arrow from './Arrow';

interface HeaderProps {
  createTodos: (todos: TodoType) => void;
  incrementId: () => number;
}

const TodoHeader: React.FC<HeaderProps> = ({ createTodos, incrementId }) => {
  const [todoText, setTodoText] = useState<string>('');

  const getTodayDate = (): string => {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const dateString = `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`;
    return dateString;
  };

  const todoTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const {
      target: { value },
    } = event;
    setTodoText(value);
  };

  const submitTodos: React.FormEventHandler<HTMLFormElement> = (
    event,
  ): void => {
    event.preventDefault();

    createTodos({
      id: incrementId(),
      taskName: todoText,
      status: STATUS.NOT_STARTED,
      importance: IMPORTANCE.NOT_IMPORTANT,
      goalDate: '2021-08-31',
      createdAt: getTodayDate(),
      updatedAt: getTodayDate(),
    });
    setTodoText('');
  };

  return (
    <HeaderContainer>
      <TodoForm onSubmit={submitTodos}>
        <TodoInput
          type="text"
          placeholder="What are your plans for today?"
          onChange={todoTextChange}
          value={todoText}
        />
        <TodoSubmit>
          <Arrow />
        </TodoSubmit>
      </TodoForm>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  margin-top: 20px;
`;

const TodoForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3e96ff;
  border-radius: 50px;
  padding: 20px 25px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
`;

const TodoInput = styled.input`
  all: unset;
  padding: 10px;
  margin-left: 25px;
  width: 75%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  border-bottom: 2px solid transparent;
  color: #ffffff;
  position: relative;
  &::placeholder {
    text-align: center;
    color: #ffffff;
    font-size: 21px;
  }

  &:focus {
    border-bottom: 2px solid #ffffff;
    transition: border-bottom 0.5s linear;
  }
`;

const TodoSubmit = styled.button`
  all: unset;
  margin-right: 25px;
  padding: 10px;
  cursor: pointer;

  & svg {
    fill: #ffffff;
  }
`;

export default TodoHeader;
