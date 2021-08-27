import React from 'react';
import styled from 'styled-components';
import { TodoType } from 'src/utils/utilTypes';
import { useDispatch } from 'src/utils/context';
import { STATUS, TODO_KEYS } from 'src/utils/constants';

interface TodoItemProps {
  todo: TodoType;
}

const Status = ({ todo }: TodoItemProps) => {
  const selectList = [STATUS.NOT_STARTED, STATUS.ONGOING, STATUS.FINISHED];
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const {
      target: { value },
    } = event;
    dispatch({ type: 'EDIT', id: todo.id, name: TODO_KEYS.status, value });
  };

  return (
    <Select status={todo.status} onChange={handleChange}>
      <Options defaultValue={todo.status} hidden>
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
  color: ${(props) =>
    props.status === STATUS.ONGOING
      ? '#5457c2'
      : props.status === STATUS.NOT_STARTED
      ? '#5ebb9d'
      : '#ddd'};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

const Options = styled.option`
  color: black;
`;

export default Status;
