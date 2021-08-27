import { DragEvent, MutableRefObject } from 'react';

export interface TodoType {
  id: number;
  taskName: string;
  status: string;
  isImportant: boolean;
  goalDate: string;
  createdAt: number;
  updatedAt: number;
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
  INITIAL: string;
}

export interface UseDragListTypes {
  lists: TodoType[];
  isDragging: boolean;
  handleDragStart: (e: DragEvent<HTMLElement>, itemIndex: number) => void;
  handleDragEnter: (e: DragEvent<HTMLElement>, targetItem: number) => void;
  handleDragEnd: (e: DragEvent<HTMLElement>) => void;
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  handleDragDrop: (e: DragEvent<HTMLElement>) => void;
  dragItemIndex: MutableRefObject<number | null>;
}
