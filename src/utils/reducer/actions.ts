import { TodoType } from '../utilTypes';

export type Action =
  | { type: 'ADD'; text: string }
  | { type: 'DELETE'; id: number }
  | { type: 'EDIT'; id: number; name: string; value: string | boolean }
  | { type: 'LOAD'; todoState: TodoType[] };
