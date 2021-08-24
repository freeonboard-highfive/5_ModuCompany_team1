import { TODO_KEYS } from 'src/utils/constants';
import { TodoType } from '@src/utils/utilTypes';
import React, { useState } from 'react';
import styled from 'styled-components';

interface EditTodoProps {
  toggleEditMode: () => void;
  editTodo: (id: number, name: string, value: string | boolean) => void;
  todo: TodoType;
}

const EditTodo: React.FC<EditTodoProps> = ({
  toggleEditMode,
  editTodo,
  todo,
}) => {
  const [editedText, setEditedText] = useState<string>('');
  const changeTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setEditedText(value);
  };

  const submitEdited = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    editTodo(todo.id, TODO_KEYS.taskName, editedText);
    setEditedText('');
    toggleEditMode();
  };

  return (
    <>
      <EidtForm onSubmit={submitEdited}>
        <EidtInput type="text" onChange={changeTodoText} value={editedText} />
        <EditButton>Edit</EditButton>
      </EidtForm>
      <CancelButton onClick={toggleEditMode}>Cancel</CancelButton>
    </>
  );
};

const EidtForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const EidtInput = styled.input`
  all: unset;
  width: 90%;
  padding-bottom: 4px;
  font-size: 17px;
  border-bottom: 2px solid transparent;

  &:focus {
    border-color: black;
    transition: border-color 0.5s ease-in-out;
  }
`;

const EditButton = styled.button`
  all: unset;
  margin-right: 10px;
  padding: 5px;
  font-size: 16px;
  color: #119955;
  cursor: pointer;
`;

const CancelButton = styled.button`
  all: unset;
  padding: 5px;
  font-size: 16px;
  color: #ff0000;
  cursor: pointer;
`;

export default React.memo(EditTodo);
