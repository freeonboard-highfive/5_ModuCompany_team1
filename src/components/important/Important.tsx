import React from 'react';
import { useDispatch } from 'src/utils/context';
import { TodoType } from 'src/utils/utilTypes';
import { FilledStar, NotFilledStar } from 'src/assets/Stars';
import { TODO_KEYS } from 'src/utils/constants';

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
        <span onClick={handleImportant}>
          {todo.isImportant ? <FilledStar /> : <NotFilledStar />}
        </span>
      )}
    </>
  );
};

export default Important;
