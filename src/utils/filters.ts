import { DateType, IMPORTANCE, Status } from './filterEnum';
import { TodoType } from './utilTypes';

export const filterDate = (arr: TodoType[], dateType: string): TodoType[] => {
  switch (dateType) {
    case DateType.GoalDate:
      const goalSort = arr.sort(
        (creat1: TodoType, creat2: TodoType) =>
          Date.parse(creat1.goalDate) - Date.parse(creat2.goalDate),
      );
      return [...goalSort];
    case DateType.CreatedAt:
      const createSort = arr.sort(
        (creat1: TodoType, creat2: TodoType) =>
          creat1.createdAt - creat2.createdAt,
      );
      return [...createSort];
    case DateType.UpdatedAt:
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
    case IMPORTANCE.true:
      return arr.filter((todo: TodoType) => todo.isImportant);
    case IMPORTANCE.false:
      return arr.filter((todo: TodoType) => !todo.isImportant);
    default:
      return arr;
  }
};

export const filterStatus = (arr: TodoType[], status: string) => {
  if (status === Status.ALL) {
    return arr;
  } else {
    return arr.filter((todo: TodoType) => todo.status === status);
  }
};
