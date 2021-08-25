import { TODO_KEYS } from 'src/utils/constants';
import { TodoType } from 'src/utils/utilTypes';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'src/utils/context';

interface EditTodoProps {
  toggleEditMode: () => void;
  todo: TodoType;
}

const EditTodo: React.FC<EditTodoProps> = ({ toggleEditMode, todo }) => {
  const [editedText, setEditedText] = useState<string>('');
  const dispatch = useDispatch();

  const closeEdit = (event: React.KeyboardEvent): void => {
    if (event.key !== 'Escape') return;
    toggleEditMode();
  };

  const changeTodoText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event;
    setEditedText(value);
  };

  const submitEdited = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    dispatch({
      type: 'EDIT',
      id: todo.id,
      name: TODO_KEYS.taskName,
      value: editedText,
    });
    setEditedText('');
    toggleEditMode();
  };

  return (
    <EditForm onSubmit={submitEdited}>
      <EditInput
        type="text"
        onChange={changeTodoText}
        value={editedText}
        onKeyDown={closeEdit}
      />
    </EditForm>
  );
};

const EditForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
  width: 100%;
`;

const EditInput = styled.input`
  all: unset;
  width: 90%;
  padding: 3px 0px 14px 0px;
  margin-left: 10px;
  font-size: 17px;
  border-bottom: 2px solid black;

  &:focus {
    border-color: #3e96ff;
    transition: border-color 0.5s ease-in-out;
  }
`;

export default React.memo(EditTodo);
