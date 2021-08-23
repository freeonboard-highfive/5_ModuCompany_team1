import { StatusTypes, ImportanceTypes } from './utilTypes';

export const STATUS: StatusTypes = {
  FINISHED: '완료',
  ONGOING: '진행중',
  NOT_STARTED: '시작안함',
};

export const importance: ImportanceTypes = {
  NOT_IMPORTANT: 1,
  IMPORTANT: 2,
  VERY_IMPORTANT: 3,
};

export const STORAGE_KEY: string = 'toDos';

export const INITAILTODO: [] = [];
