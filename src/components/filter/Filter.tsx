import React, { useCallback, useEffect, useState } from 'react';
import TodoItem from 'src/components/todoItem/TodoItem';
import styled from 'styled-components';
import { TodoType } from 'src/utils/utilTypes';
import { Status, DateType, IMPORTANCE } from 'src/utils/filterEnum';
import useDragList from 'src/hooks/useDragList';
import { INITIALTODO } from 'src/utils/constants';
import { useTodoState } from 'src/utils/context';

const Filter: React.FC = () => {
  const _todos = useTodoState();
  const [modifiedTodos, setModifiedTodos] = useState<TodoType[]>(INITIALTODO);
  const [status, setStatus] = useState<Status | string>(Status.ALL);
  const [dateType, setDateType] = useState<DateType | string>(
    DateType.CreatedAt,
  );
  const [importance, setImportance] = useState<IMPORTANCE | string>(
    IMPORTANCE.All,
  );
  const {
    lists,
    isDragging,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDragOver,
    handleDragDrop,
    dragItemIndex,
  } = useDragList(_todos);

  const filterDate = (dateType: string): TodoType[] => {
    switch (dateType) {
      case DateType.GoalDate:
        const goalSort = modifiedTodos.sort(
          (creat1: TodoType, creat2: TodoType) =>
            Date.parse(creat1.goalDate) - Date.parse(creat2.goalDate),
        );
        return [...goalSort];
      case DateType.CreatedAt:
        const createSort = modifiedTodos.sort(
          (creat1: TodoType, creat2: TodoType) =>
            creat1.createdAt - creat2.createdAt,
        );
        return [...createSort];
      case DateType.UpdatedAt:
        const updateSort = modifiedTodos.sort(
          (creat1: TodoType, creat2: TodoType) =>
            creat1.updatedAt - creat2.updatedAt,
        );
        return [...updateSort];
      default:
        return modifiedTodos;
    }
  };

  const filterImportance = useCallback(
    (arr: TodoType[]): TodoType[] => {
      switch (importance) {
        case IMPORTANCE.true:
          return arr.filter((todo: TodoType) => todo.isImportant);
        case IMPORTANCE.false:
          return arr.filter((todo: TodoType) => !todo.isImportant);
        default:
          return arr;
      }
    },
    [importance],
  );

  const filterTodoStatus = useCallback((): void => {
    if (status === Status.ALL) {
      const sortimportance: TodoType[] = filterImportance(lists);
      return setModifiedTodos(sortimportance);
    }

    const filteredTodo: TodoType[] = lists.filter(
      (todo: TodoType) => todo.status === status,
    );
    const importanceArr = filterImportance(filteredTodo);
    return setModifiedTodos(importanceArr);
  }, [lists, status, filterImportance]);

  useEffect(() => {
    filterTodoStatus();
  }, [filterTodoStatus]);

  useEffect(() => {
    const sortedArr = filterDate(dateType);
    setModifiedTodos(sortedArr);
  }, [dateType]);

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const target_status: string = e.target.value;
    setStatus(target_status);
  };

  const onChangeImportance = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setImportance(e.target.value);
  };

  const sortDateType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const date_type: string = e.target.value;
    setDateType(date_type);
  };

  return (
    <>
      <SelectBoxes>
        <SelectBox name="Status" id="Status" onChange={onChangeStatus}>
          <option defaultValue={Status.ALL}>All</option>
          <option value={Status.FINISHED}>Finished</option>
          <option value={Status.ONGOING}>Ongoing</option>
          <option value={Status.NOT_STARTED}>Not Started</option>
        </SelectBox>
        <SelectBox name="Date" id="Date" onChange={sortDateType}>
          <option value={DateType.CreatedAt}>latest creation order</option>
          <option value={DateType.UpdatedAt}>latest update order</option>
          <option value={DateType.GoalDate}>close to the deadline</option>
        </SelectBox>
        <SelectBox
          name="Importance"
          id="Importance"
          onChange={onChangeImportance}
        >
          <option value={IMPORTANCE.All}>All</option>
          <option value={IMPORTANCE.true}>Important ★</option>
          <option value={IMPORTANCE.false}>Not important ☆</option>
        </SelectBox>
      </SelectBoxes>
      <TodoLists>
        {modifiedTodos.map((todo, index) => (
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
export default Filter;

const SelectBoxes = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 149px 30px 20px;
  margin-bottom: 15px;
  border-bottom: 1px solid lightgray;
`;
const SelectBox = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg')
    no-repeat 95% 50%;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    outline: none;
  }
  width: 240px;
  padding: 17px 20px 16px 20px;
  border: 1px solid lightgray;
  border-radius: 50px;
  font-size: 19px;
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.isdragging && 'lightgray'};

  :not(:last-of-type) {
    margin-bottom: 0.5rem;
  }

  * {
    font-size: 1.2rem;
  }
`;
