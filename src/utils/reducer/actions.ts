import { TodoType } from '../utilTypes';

export type Action =
  | { type: 'ADD'; taskName: string; status: string; goalDate: string }
  | { type: 'DELETE'; id: number }
  | { type: 'EDIT'; id: number; name: string; value: string | boolean }
  | { type: 'SET'; todoState: TodoType[] };

