import { StatusTypes, TodoFormatTypes } from './utilTypes';

export const STATUS: StatusTypes = {
  FINISHED: 'Finished',
  ONGOING: 'Ongoing',
  NOT_STARTED: 'Not Started',
  INITIAL: 'Status',
};

export const TODO_KEYS: TodoFormatTypes = {
  id: 'id',
  taskName: 'taskName',
  status: 'status',
  isImportant: 'isImportant',
  goalDate: 'goalDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

export const SELECT_NAME = {
  status: 'Status',
  date: 'Date',
  importance: 'Importance',
};

export const STORAGE_KEY: string = 'toDos';

export const INITIAL_TODO: [] = [];

export const ActionTypes = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  EDIT: 'EDIT',
  LOAD: 'LOAD',
};
