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

  useEffect(() => {
    const closeEdit = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return;
      toggleEditMode();
    };
    window.addEventListener('keydown', closeEdit);
    return () => window.removeEventListener('keydown', closeEdit);
  }, [toggleEditMode]);

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
      <EditInput type="text" onChange={changeTodoText} value={editedText} />
    </EditForm>
  );
};

const EditForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const EditInput = styled.input`
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

export default React.memo(EditTodo);
