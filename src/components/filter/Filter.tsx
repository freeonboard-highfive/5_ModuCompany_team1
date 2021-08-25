import React, { useState } from 'react';
import TodoItem from 'src/components/todoItem/TodoItem';
import styled from 'styled-components';
import { TodoType } from 'src/utils/utilTypes';
import { Status, DateType, IMPORTANCE } from 'src/utils/filterEnum';
import useDragList from 'src/hooks/useDragList';

interface TodoItemTypes {
  _todos: TodoType[];
}

const Filter: React.FC<TodoItemTypes> = ({ _todos }) => {
  const [modifiedTodos, setModifiedTodos] = useState<TodoType[]>([]);
  const [status, setStatus] = useState<Status | string>('');
  const [dateType, setDateType] = useState<string>('');
  const [importance, setImportance] = useState<boolean | number | null>(null);
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

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const target_status: string = e.target.value;
    setStatus(target_status);

    switch (target_status) {
      case Status.ONGOING:
        const ongoing_list = lists.filter(
          (todo) => todo.status === Status.ONGOING,
        );
        setModifiedTodos(ongoing_list);
        break;
      case Status.FINISHED:
        const finished_list = lists.filter(
          (todo) => todo.status === Status.FINISHED,
        );
        setModifiedTodos(finished_list);
        break;
      case Status.NOT_STARTED:
        const not_started_list = lists.filter(
          (todo) => todo.status === Status.NOT_STARTED,
        );
        setModifiedTodos(not_started_list);
        break;
      default:
    }
  };

  const onChangeImportance = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setImportance(Number(e.target.value));

    if (importance) {
      const important_list = lists.filter((todo) => !todo.isImportant);
      setModifiedTodos(important_list);
      setImportance(false);
    }
    if (!importance) {
      const unimportant_list = lists.filter((todo) => todo.isImportant);
      setModifiedTodos(unimportant_list);
      setImportance(true);
    }
  };

  const sortDateType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const date_type = e.target.value;
    setDateType(date_type);

    switch (date_type) {
      case DateType.GoalDate:
        const by_goal_date = lists.sort(
          (creat1: TodoType, creat2: TodoType) =>
            Date.parse(creat1.goalDate) - Date.parse(creat2.goalDate),
        );
        setModifiedTodos(by_goal_date);
        break;
      case DateType.CreatedAt:
        const by_create_date = lists.sort(
          (creat1: TodoType, creat2: TodoType) =>
            Date.parse(creat2.createdAt) - Date.parse(creat1.createdAt),
        );
        setModifiedTodos(by_create_date);
        break;
      case DateType.UpdatedAt:
        const by_update_date = lists.sort(
          (creat1: TodoType, creat2: TodoType) =>
            Date.parse(creat2.updatedAt) - Date.parse(creat1.updatedAt),
        );
        setModifiedTodos(by_update_date);
        break;

      default:
    }
  };

  return (
    <>
      <SelectBoxes>
        <SelectBox name="Status" id="Status" onChange={onChangeStatus}>
          <option defaultValue={'Status'} hidden>
            Status
          </option>
          <option value={Status.FINISHED}>Finished</option>
          <option value={Status.ONGOING}>Ongoing</option>
          <option value={Status.NOT_STARTED}>Not Started</option>
        </SelectBox>
        <SelectBox name="Date" id="Date" onChange={sortDateType}>
          <option defaultValue={'Date'} hidden>
            Date
          </option>
          <option value={DateType.UpdatedAt}>latest update order</option>
          <option value={DateType.CreatedAt}>latest creation order</option>
          <option value={DateType.GoalDate}>close to the deadline</option>
        </SelectBox>
        <SelectBox
          name="Importance"
          id="Importance"
          onChange={onChangeImportance}
        >
          <option defaultValue={'Importance'} hidden>
            Importance
          </option>
          <option value={IMPORTANCE.true}>Important ★</option>
          <option value={IMPORTANCE.false}>Not important ☆</option>
        </SelectBox>
      </SelectBoxes>

      <TodoLists>
        {modifiedTodos.length
          ? modifiedTodos.map((todo) => {
              return <TodoItem key={todo.id} todo={todo} />;
            })
          : lists.map((todo, index) => {
              return (
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
