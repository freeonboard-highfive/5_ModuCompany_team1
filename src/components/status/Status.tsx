import React, { useState } from 'react'
import styled, { css }from 'styled-components';
import { TodoType } from 'src/utils/utilTypes';



interface TodoItemProps {
  updateStatus: (id: number, e: React.ChangeEvent<HTMLSelectElement>) => void;
  todo: TodoType;
}

const Status = ({ updateStatus, todo }: TodoItemProps) => {
    const selectList = ['Status', 'Todo', 'Doing', 'Done'];
    const [value, setValue] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        updateStatus(todo.id, e)
        setValue(e.target.value);
    }

    return (
        <Select status={value} onChange={handleChange}>
            {selectList.map((item) => (
              <Options value={item} key={item}>{item}</Options>
            ))}
        </Select>
    )
}

const Select = styled.select<{status: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 46px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
  ${(props) => props.status === 'Done' && css`color: #ddd`};
`;

const Options = styled.option``;

export default Status
