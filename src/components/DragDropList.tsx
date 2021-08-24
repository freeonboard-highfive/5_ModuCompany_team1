import { DragEvent, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface dragDropProps {
  propList: any[];
}

const DragDropList = ({ propList }: dragDropProps) => {
  const [lists, setLists] = useState(propList);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragItem = useRef<number | null>(null);
  const dragItemNode = useRef<EventTarget | null>(null);

  useEffect(() => {
    setLists(propList);
  }, [setLists, propList]);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: any) => {
    dragItemNode.current = e.target;
    e.dataTransfer.effectAllowed = 'move';
    dragItem.current = item;
    setTimeout(() => setIsDragging(true), 0);
  };
  const handleDragEnter = (e: DragEvent<HTMLDivElement>, targetItem: any) => {
    if (dragItemNode.current !== e.target) {
      setLists((oldList) => {
        let newList = oldList;
        newList.splice(targetItem, 0, newList.splice(dragItem.current!, 1)[0]);
        dragItem.current = targetItem;
        return [...newList];
      });
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDragDrop = (e: DragEvent<HTMLDivElement>) => {
    localStorage.setItem('List', JSON.stringify(lists));
  };
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const getLists = JSON.parse(localStorage.getItem('List') ?? '') ?? lists;
    setLists(getLists);
    setIsDragging(false);
    dragItem.current = null;
    dragItemNode.current = null;
  };
  return (
    <>
      <Container>
        <Group>
          {lists.map((item, index) => {
            return (
              <DraggableItem
                key={item}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={
                  isDragging ? (e) => handleDragEnter(e, index) : () => {}
                }
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                onDrop={handleDragDrop}
                isdragging={dragItem.current === index}
              >
                {item}
              </DraggableItem>
            );
          })}
        </Group>
      </Container>
    </>
  );
};
export default DragDropList;

const Container = styled.div`
  padding: 0.5rem;
  display: grid;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(auto-fill, 300px);
  align-items: start;
`;

const Group = styled.div`
  background-color: #49505e;
  border-radius: 5px;
  padding: 0.5rem;
`;

const DraggableItem = styled.div<{ isdragging: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  background-color: white;
  border-radius: 5px;
  color: #282c34;
  font-weight: bold;
  background-color: ${(props) => props.isdragging && '#282c34'};

  :not(:last-of-type) {
    margin-bottom: 0.5rem;
  }

  * {
    margin: 0;
    font-size: 1.2rem;
  }
`;
