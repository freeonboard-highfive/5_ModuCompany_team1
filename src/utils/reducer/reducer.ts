import { INITIAL_TODO } from '../constants';
import { incrementStorageId } from '../localStorage';
import { TodoType } from '../utilTypes';
import { Action } from './actions';

const reducer = (
  state: TodoType[] = INITIAL_TODO,
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
        createdAt: Date.now(),
        updatedAt: Date.now(),
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
              updatedAt: Date.now(),
            },
      );
    default:
      return state;
  }
};

export default reducer;
