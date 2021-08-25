import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { TodoType } from 'src/utils/utilTypes';
import { useDispatch } from 'src/utils/context';
import { TODO_KEYS } from 'src/utils/constants';

interface TodoItemProps {
  todo: TodoType;
}

const Status = ({ todo }: TodoItemProps) => {
  const selectList = ['Todo', 'Doing', 'Done'];
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const {
      target: { value },
    } = event;
    dispatch({ type: 'EDIT', id: todo.id, name: TODO_KEYS.status, value });
    setValue(value);
  };

  return (
    <Select status={value} onChange={handleChange}>
      <Options defaultValue={'Status'} hidden>
        {todo.status}
      </Options>
      {selectList.map((item) => (
        <Options value={item} key={item}>
          {item}
        </Options>
      ))}
    </Select>
  );
};

const Select = styled.select<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 46px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
  ${(props) =>
    props.status === 'Done' &&
    css`
      color: #ddd;
    `};
`;

const Options = styled.option``;

export default Status;
