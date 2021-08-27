import { INITIALTODO } from '../constants';
import { getDateString } from '../getDateString';
import { incrementStorageId } from '../localStorage';
import { TodoType } from '../utilTypes';
import { Action } from './actions';

const reducer = (
  state: TodoType[] = INITIALTODO,
  action: Action,
): TodoType[] => {
  switch (action.type) {
    case 'SET':
      return [...action.todoState];
    case 'ADD':
      return state.concat({
        id: incrementStorageId(),
        taskName: action.taskName,
        status: action.status,
        isImportant: false,
        goalDate: action.goalDate,
        createdAt: getDateString(),
        updatedAt: getDateString(),
      });
    case 'DELETE':
      return state.filter((todo: TodoType) => todo.id !== action.id);
    case 'EDIT':
      return state.map((todo: TodoType) =>
        action.id !== todo.id
          ? todo
          : {
              ...todo,
              [action.name]: action.value,
              updatedAt: getDateString(),
            },
      );
    default:
      return state;
  }
};

export default reducer;
