import React, {
  createContext,
  Dispatch,
  ReactElement,
  useContext,
  useReducer,
} from 'react';
import { INITIALTODO } from './constants';
import { TodoType } from './utilTypes';
import reducer from './reducer/reducer';
import { Action } from './reducer/actions';

type DispatchAction = Dispatch<Action>;

interface ChildrenTypes {
  children:
    | {
        children: React.ReactNode;
      }
    | ReactElement;
}

export const TodoContext = createContext<TodoType[] | null>(null);
export const DispatchContext = createContext<DispatchAction | null>(null);

const ToDosProvider: React.FC<ChildrenTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIALTODO);
  return (
    <TodoContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodoContext.Provider>
  );
};

export const useDispatch = (): DispatchAction => {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error('Error 1');
  return dispatch;
};

export const useTodoState = (): TodoType[] => {
  const state = useContext(TodoContext);
  if (!state) throw new Error('Error 2');
  return state;
};

export default ToDosProvider;
