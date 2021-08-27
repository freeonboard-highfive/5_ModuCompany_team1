import React, { useEffect, useState } from 'react';
import TodoItem from 'src/components/todoItem/TodoItem';
import styled from 'styled-components';
import { TodoType } from 'src/utils/utilTypes';
import { Status, DateType, IMPORTANCE } from 'src/utils/filterEnum';
import useDragList from 'src/hooks/useDragList';
import { useTodoState } from 'src/utils/context';
import { SELECT_NAME } from 'src/utils/constants';
import { filterDate, filterImportance, filterStatus } from 'src/utils/filters';

const Filter: React.FC = () => {
  const _todos = useTodoState();
  const [modifiedTodos, setModifiedTodos] = useState<TodoType[]>([]);
  const [status, setStatus] = useState<Status | string>(Status.ALL);
  const [dateType, setDateType] = useState<string>(DateType.CreatedAt);
  const [importance, setImportance] = useState<string>(IMPORTANCE.All);
  const {
    lists,
    isDragging,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDragOver,
    handleDragDrop,
    dragItemIndex,
  } = useDragList(modifiedTodos, setModifiedTodos);

  useEffect(() => {
    const filteredTodo = filterImportance(
      filterDate(filterStatus(_todos, status), dateType),
      importance,
    );
    setModifiedTodos(filteredTodo);
  }, [status, dateType, importance, _todos]);

  const onSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case SELECT_NAME.status:
        setStatus(value);
        return;
      case SELECT_NAME.date:
        setDateType(value);
        return;
      case SELECT_NAME.importance:
        setImportance(value);
        return;
      default:
        return;
    }
  };

  return (
    <>
      <SelectBoxes>
        <SelectBox
          name={SELECT_NAME.status}
          id={SELECT_NAME.status}
          onChange={onSelectChange}
        >
          <option defaultValue={Status.ALL}>All</option>
          <option value={Status.FINISHED}>Finished</option>
          <option value={Status.ONGOING}>Ongoing</option>
          <option value={Status.NOT_STARTED}>Not Started</option>
        </SelectBox>
        <SelectBox
          name={SELECT_NAME.date}
          id={SELECT_NAME.date}
          onChange={onSelectChange}
        >
          <option value={DateType.CreatedAt}>latest creation order</option>
          <option value={DateType.UpdatedAt}>latest update order</option>
          <option value={DateType.GoalDate}>close to the deadline</option>
        </SelectBox>
        <SelectBox
          name={SELECT_NAME.importance}
          id={SELECT_NAME.importance}
          onChange={onSelectChange}
        >
          <option value={IMPORTANCE.All}>All</option>
          <option value={IMPORTANCE.true}>Important ★</option>
          <option value={IMPORTANCE.false}>Not important ☆</option>
        </SelectBox>
      </SelectBoxes>
      <TodoLists>
        {lists.map((todo, index) => (
          <TodoItemContainer
            key={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={
              isDragging ? (e) => handleDragEnter(e, index) : () => {}
            }
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDrop={handleDragDrop}
            isdragging={dragItemIndex.current === index}
          >
            <TodoItem todo={todo} />
          </TodoItemContainer>
        ))}
      </TodoLists>
    </>
  );
};
export default React.memo(Filter);

const SelectBoxes = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 0 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid lightgray;
`;
const SelectBox = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg')
    no-repeat 100% 50%;
    background-size: 20px;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    outline: none;
  }
  width: 200px;
  padding: 10px 15px;
  border: none;
  border-bottom: 1px solid lightgray;
  outline: none;
  font-size: 16px;
  color: #646363;
`;
const TodoLists = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 25px;
  padding: 0px 25px;
`;

const TodoItemContainer = styled.li<{ isdragging: boolean }>`
  display: flex;

  width: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.isdragging && 'lightgray'};

  :not(:last-of-type) {
    margin-bottom: 0.5rem;
  }
`;
