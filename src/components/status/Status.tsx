import React, { useState } from 'react'
import styled from 'styled-components';
import { TodoType } from 'src/utils/utilTypes';

const Select = styled.select`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 46px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
`;

const Options = styled.option``;

interface TodoItemProps {
  updateStatus: (id: number, e: React.ChangeEvent<HTMLSelectElement>) => void;
  todo: TodoType;
}

const Status = ({ updateStatus, todo }: TodoItemProps) => {
    const [value, setValue] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        updateStatus(todo.id, e)
        setValue(e.target.value);
    }

    return (
        <Select value={value} onChange={handleChange}>
            <Options value='Todo'>Todo</Options>
            <Options value='Doing'>Doing</Options>
            <Options value='Done'>Done</Options>
        </Select>
    )
}

export default Status
