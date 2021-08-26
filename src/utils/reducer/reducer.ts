import { act } from 'react-dom/test-utils';
import { INITIALTODO, STATUS } from '../constants';
import { getTodayDate } from '../getTodayDate';
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
        createdAt: getTodayDate(),
        updatedAt: getTodayDate(),
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
              updatedAt: getTodayDate(),
            },
      );
    default:
      return state;
  }
};

export default reducer;
