import { useDispatch } from 'src/utils/context';
import React, { useState } from 'react';
import styled from 'styled-components';
import Arrow from '../../assets/Arrow';

const TodoHeader: React.FC = () => {
  const [todoText, setTodoText] = useState<string>('');
  const dispatch = useDispatch();

  const todoTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const {
      target: { value },
    } = event;
    setTodoText(value);
  };

  const submitTodos: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    dispatch({ type: 'ADD', text: todoText });
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
  max-width: 768px;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
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

export default React.memo(TodoHeader);
