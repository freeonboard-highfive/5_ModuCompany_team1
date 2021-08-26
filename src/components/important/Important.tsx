import React, { useState } from 'react'
import { useDispatch } from 'src/utils/context';
import { TodoType } from 'src/utils/utilTypes';
import { FilledStar, NotFilledStar } from 'src/assets/Stars'
import { TODO_KEYS } from 'src/utils/constants';

interface TodoItemProps {
    todo: TodoType;
  }

const Important = ({ todo }: TodoItemProps) => {
    const [isImportant, setIsImportant] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleImportant = (event: React.MouseEvent<HTMLSpanElement>): void => {
        setIsImportant(prev => !prev)
    }

    return (
        <>
            {!isImportant &&
                <span onClick={handleImportant}>
                    {isImportant ? <FilledStar /> : <NotFilledStar />}
                </span>
            }
        </>
    )
}

export default Important
