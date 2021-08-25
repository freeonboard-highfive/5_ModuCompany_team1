export interface TodoType {
  id: number;
  taskName: string;
  status: string;
  isImportant: boolean;
  goalDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFormatTypes {
  id: string;
  taskName: string;
  status: string;
  isImportant: string;
  goalDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatusTypes {
  FINISHED: string;
  ONGOING: string;
  NOT_STARTED: string;
}

export interface UseTodoTypes {
  createTodos: (todos: TodoType) => void;
  incrementId: () => number;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, name: string, value: string | boolean) => void;
  updateStatus: (id: number, e: React.ChangeEvent<HTMLSelectElement>) => void;
  todos: TodoType[];
}
