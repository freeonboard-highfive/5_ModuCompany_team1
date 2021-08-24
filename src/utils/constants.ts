import { StatusTypes, TodoFormatTypes } from './utilTypes';

export const STATUS: StatusTypes = {
  FINISHED: '완료',
  ONGOING: '진행중',
  NOT_STARTED: '시작안함',
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
