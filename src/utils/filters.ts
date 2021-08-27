import { DateTypeEnum, ImportanceEnum, StatusEnum } from './filterEnum';
import { TodoType } from './utilTypes';

export const filterDate = (arr: TodoType[], dateType: string): TodoType[] => {
  switch (dateType) {
    case DateTypeEnum.GoalDate:
      const goalSort = arr.sort(
        (creat1: TodoType, creat2: TodoType) =>
          Date.parse(creat1.goalDate) - Date.parse(creat2.goalDate),
      );
      return [...goalSort];
    case DateTypeEnum.CreatedAt:
      const createSort = arr.sort(
        (creat1: TodoType, creat2: TodoType) =>
          creat2.createdAt - creat1.createdAt,
      );
      return [...createSort];
    case DateTypeEnum.UpdatedAt:
      const updateSort = arr.sort(
        (creat1: TodoType, creat2: TodoType) =>
          creat1.updatedAt - creat2.updatedAt,
      );
      return [...updateSort];
    default:
      return arr;
  }
};

export const filterImportance = (arr: TodoType[], importance: string) => {
  switch (importance) {
    case ImportanceEnum.true:
      return arr.filter((todo: TodoType) => todo.isImportant);
    case ImportanceEnum.false:
      return arr.filter((todo: TodoType) => !todo.isImportant);
    default:
      return arr;
  }
};

export const filterStatus = (arr: TodoType[], status: string) => {
  if (status === StatusEnum.ALL) {
    return [...arr];
  } else {
    return arr.filter((todo: TodoType) => todo.status === status);
  }
};
