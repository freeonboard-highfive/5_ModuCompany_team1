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
    case 'LOAD':
      return [...action.todoState];
    case 'ADD':
      return state.concat({
        id: incrementStorageId(),
        taskName: action.text,
        status: STATUS.NOT_STARTED,
        isImportant: false,
        goalDate: '2021-08-31',
        createdAt: Date.now(),
        updatedAt: -Date.now(),
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
              updatedAt: -Date.now(),
            },
      );
    default:
      return state;
  }
};

export default reducer;
