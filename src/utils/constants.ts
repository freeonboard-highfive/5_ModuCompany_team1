import { StatusTypes, TodoFormatTypes } from './utilTypes';

export const STATUS: StatusTypes = {
  FINISHED: 'Done',
  ONGOING: 'Doing',
  NOT_STARTED: 'Todo'
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

export const STORAGE_KEY: string = 'toDos';

export const INITIALTODO: [] = [];
