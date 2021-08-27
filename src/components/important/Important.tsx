import React from 'react';
import { useDispatch } from 'src/utils/context';
import { TodoType } from 'src/utils/utilTypes';
import { FilledStar, NotFilledStar } from 'src/assets/Stars';
import { TODO_KEYS } from 'src/utils/constants';
import styled from 'styled-components';

interface TodoItemProps {
  todo: TodoType;
}

const Important = ({ todo }: TodoItemProps) => {
  const dispatch = useDispatch();

  const handleImportant: React.MouseEventHandler<HTMLSpanElement> =
    (): void => {
      dispatch({
        type: 'EDIT',
        id: todo.id,
        name: TODO_KEYS.isImportant,
        value: !todo.isImportant,
      });
    };

  return (
    <>
      {todo && (
        <ImportantToggle onClick={handleImportant}>
          {todo.isImportant ? <FilledStar /> : <NotFilledStar />}
        </ImportantToggle>
      )}
    </>
  );
};

export default Important;

const ImportantToggle = styled.span`
  cursor: pointer;
`;
