import React, { useCallback, useEffect, useState } from 'react';
import TodoItem from 'src/components/todoItem/TodoItem';
import styled from 'styled-components';
import { TodoType } from 'src/utils/utilTypes';
import { Status, DateType, IMPORTANCE } from 'src/utils/filterEnum';
import useDragList from 'src/hooks/useDragList';
import { useTodoState } from 'src/utils/context';
import { SELECTNAME } from 'src/utils/constants';

const Filter: React.FC = () => {
  const _todos = useTodoState();
  const [modifiedTodos, setModifiedTodos] = useState<TodoType[]>([]);
  const [status, setStatus] = useState<Status | string>(Status.ALL);
  const [dateType, setDateType] = useState<string>(DateType.CreatedAt);
  const [importance, setImportance] = useState<string>(IMPORTANCE.All);
  const modifiedDragList = useDragList(modifiedTodos, setModifiedTodos);

  const filterDate = (dateType: string): TodoType[] => {
    switch (dateType) {
      case DateType.GoalDate:
        const goalSort = _todos.sort(
          (creat1: TodoType, creat2: TodoType) =>
            Date.parse(creat1.goalDate) - Date.parse(creat2.goalDate),
        );
        return [...goalSort];
      case DateType.CreatedAt:
        const createSort = _todos.sort(
          (creat1: TodoType, creat2: TodoType) =>
            creat1.createdAt - creat2.createdAt,
        );
        return [...createSort];
      case DateType.UpdatedAt:
        const updateSort = _todos.sort(
          (creat1: TodoType, creat2: TodoType) =>
            creat2.updatedAt - creat1.updatedAt,
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
      const sortimportance: TodoType[] = filterImportance(_todos);
      return setModifiedTodos(sortimportance);
    }

    const filteredTodo: TodoType[] = _todos.filter(
      (todo: TodoType) => todo.status === status,
    );
    const importanceArr = filterImportance(filteredTodo);
    return setModifiedTodos(importanceArr);
  }, [status, filterImportance]);

  useEffect(() => {
    setModifiedTodos(_todos);
  }, [_todos]);

  useEffect(() => {
    filterTodoStatus();
  }, [filterTodoStatus]);

  useEffect(() => {
    const sortedArr = filterDate(dateType);
    setModifiedTodos(sortedArr);
  }, [dateType]);

  const onSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case SELECTNAME.status:
        setStatus(value);
        return;
      case SELECTNAME.date:
        setDateType(value);
        return;
      case SELECTNAME.importance:
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
          name={SELECTNAME.status}
          id={SELECTNAME.status}
          onChange={onSelectChange}
        >
          <option defaultValue={Status.ALL}>All</option>
          <option value={Status.FINISHED}>Finished</option>
          <option value={Status.ONGOING}>Ongoing</option>
          <option value={Status.NOT_STARTED}>Not Started</option>
        </SelectBox>
        <SelectBox
          name={SELECTNAME.date}
          id={SELECTNAME.date}
          onChange={onSelectChange}
        >
          <option value={DateType.CreatedAt}>latest creation order</option>
          <option value={DateType.UpdatedAt}>latest update order</option>
          <option value={DateType.GoalDate}>close to the deadline</option>
        </SelectBox>
        <SelectBox
          name={SELECTNAME.importance}
          id={SELECTNAME.importance}
          onChange={onSelectChange}
        >
          <option value={IMPORTANCE.All}>All</option>
          <option value={IMPORTANCE.true}>Important ★</option>
          <option value={IMPORTANCE.false}>Not important ☆</option>
        </SelectBox>
      </SelectBoxes>
      <TodoLists>
        {modifiedDragList.lists.map((todo, index) => {
          return (
            <TodoItemContainer
              key={todo.id}
              draggable
              onDragStart={(e) => modifiedDragList.handleDragStart(e, index)}
              onDragEnter={
                modifiedDragList.isDragging
                  ? (e) => modifiedDragList.handleDragEnter(e, index)
                  : () => {}
              }
              onDragOver={modifiedDragList.handleDragOver}
              onDragEnd={modifiedDragList.handleDragEnd}
              onDrop={modifiedDragList.handleDragDrop}
              isdragging={modifiedDragList.dragItemIndex.current === index}
            >
              <TodoItem todo={todo} />
            </TodoItemContainer>
          );
        })}
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
