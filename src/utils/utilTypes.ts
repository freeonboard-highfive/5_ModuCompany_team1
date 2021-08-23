export interface TodoType {
  id: number | void;
  taskName: string;
  status: string;
  importance: number;
  goalDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatusTypes {
  FINISHED: string;
  ONGOING: string;
  NOT_STARTED: string;
}

export interface ImportanceTypes {
  NOT_IMPORTANT: number;
  IMPORTANT: number;
  VERY_IMPORTANT: number;
}
