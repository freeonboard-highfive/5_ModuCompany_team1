import { TodoType } from 'src/utils/utilTypes';
import { DragEvent, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { loadLocalStorage, saveLocalStorage } from 'src/utils/localStorage';

const useDragList = (propList: TodoType[]) => {
  const [lists, setLists] = useState(propList);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragItemIndex = useRef<number | null>(null);
  const dragItemNode = useRef<EventTarget | null>(null);

  useEffect(() => {
    setLists(propList);
  }, [setLists, propList]);

  const handleDragStart = (e: DragEvent<HTMLLIElement>, itemIndex: number) => {
    dragItemNode.current = e.target;
    e.dataTransfer.effectAllowed = 'move';
    dragItemIndex.current = itemIndex;
    setTimeout(() => setIsDragging(true), 0);
  };

  const handleDragEnter = (e: DragEvent<HTMLLIElement>, targetItem: number) => {
    if (dragItemNode.current !== e.target) {
      setLists((oldList) => {
        let newList = oldList;
        newList.splice(
          targetItem,
          0,
          newList.splice(dragItemIndex.current!, 1)[0],
        );
        dragItemIndex.current = targetItem;
        return [...newList];
      });
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDragDrop = (e: DragEvent<HTMLLIElement>) => {
    saveLocalStorage(lists);
  };

  const handleDragEnd = (e: DragEvent<HTMLLIElement>) => {
    const getLists = loadLocalStorage();
    setLists(getLists);
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
