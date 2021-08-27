import { TodoType, UseDragListTypes } from 'src/utils/utilTypes';
import { Dispatch, DragEvent, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const useDragList = (
  propList: TodoType[],
  setPropList: Dispatch<React.SetStateAction<TodoType[]>>,
): UseDragListTypes => {
  const [lists, setLists] = useState<TodoType[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragItemIndex = useRef<number | null>(null);
  const dragItemNode = useRef<EventTarget | null>(null);

  useEffect(() => {
    setLists([...propList]);
  }, [propList, setLists]);

  const handleDragStart = (e: DragEvent<HTMLElement>, itemIndex: number) => {
    dragItemNode.current = e.target;
    e.dataTransfer.effectAllowed = 'move';
    dragItemIndex.current = itemIndex;
    setTimeout(() => setIsDragging(true), 0);
  };

  const handleDragEnter = (e: DragEvent<HTMLElement>, targetItem: number) => {
    if (dragItemNode.current !== e.target) {
      let newList = [...lists];
      newList.splice(
        targetItem,
        0,
        newList.splice(dragItemIndex.current!, 1)[0],
      );
      dragItemIndex.current = targetItem;
      setLists(newList);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDragDrop = (e: DragEvent<HTMLElement>) => {
    setPropList([...lists]);
  };

  const handleDragEnd = (e: DragEvent<HTMLElement>) => {
    setLists([...propList]);
    setIsDragging(false);
    dragItemIndex.current = null;
    dragItemNode.current = null;
  };

  return {
    lists,
    isDragging,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDragOver,
    handleDragDrop,
    dragItemIndex,
  };
};

export default useDragList;
