import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from 'src/components/todoItem/TodoItem';
import { TodoType } from 'src/utils/utilTypes';
import { Status, DateType, Importance } from 'src/utils/filterEnum';
import useDragList from 'src/hooks/useDragList';

interface TodoItemTypes {
  todos: TodoType[];
}

const Filter: React.FC<TodoItemTypes> = ({ todos }) => {
  const [newArr, setNewArr] = useState<TodoType[]>([]);
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
  } = useDragList(todos);

  useEffect(() => {
    const selectList = () => {
      if (modifiedTodos.length === 0) {
        setNewArr(lists);
      }
      if (modifiedTodos.length !== 0 && modifiedTodos.length !== lists.length) {
        setNewArr(modifiedTodos);
      }
      if (modifiedTodos.length === lists.length) {
        setNewArr(lists);
      }
    };
    console.log(modifiedTodos);
    selectList();
  }, [lists, modifiedTodos]);

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const target_status: string = e.target.value;
    setStatus(target_status);
    switch (target_status) {
      case Status.Ongoing:
        const ongoing_list = newArr.filter(
          (todo) => todo.status === Status.Ongoing,
        );
        setModifiedTodos(ongoing_list);
        console.log(`수정 리스트1: ${modifiedTodos.length}`);
        break;
      case Status.Finished:
        const finished_list = newArr.filter(
          (todo) => todo.status === Status.Finished,
        );
        setModifiedTodos(finished_list);
        console.log(`수정 리스트1: ${modifiedTodos.length}`);
        break;
      case Status.NotStarted:
        const not_started_list = newArr.filter(
          (todo) => todo.status === Status.NotStarted,
        );
        setModifiedTodos(not_started_list);
        console.log(`수정 리스트1: ${modifiedTodos.length}`);
        break;
      default:
    }
  };
  console.log(`수정 리스트2: ${modifiedTodos.length}`);
  console.log(`-----------`);

  const onChangeImportance = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setImportance(Number(e.target.value));

    if (importance) {
      const important_list = newArr.filter((todo) => todo.isImportant);
      setModifiedTodos(important_list);
      setImportance(false);
    }
    if (!importance) {
      const unimportant_list = newArr.filter((todo) => !todo.isImportant);
      setModifiedTodos(unimportant_list);
      setImportance(true);
    }
  };

  const sortDateType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const date_type = e.target.value;
    setDateType(date_type);

    switch (date_type) {
      case DateType.GoalDate:
        const by_goal_date = newArr.sort(
          (creat1: TodoType, creat2: TodoType) =>
            Date.parse(creat1.goalDate) - Date.parse(creat2.goalDate),
        );
        setModifiedTodos(by_goal_date);
        break;
      case DateType.CreatedAt:
        const by_create_date = newArr.sort(
          (creat1: TodoType, creat2: TodoType) =>
            Date.parse(creat2.createdAt) - Date.parse(creat1.createdAt),
        );
        setModifiedTodos(by_create_date);
        break;
      case DateType.UpdatedAt:
        const by_update_date = newArr.sort(
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
          <option value={Status.NotStarted}>{Status.NotStarted}</option>
          <option value={Status.Ongoing}>{Status.Ongoing}</option>
          <option value={Status.Finished}>{Status.Finished}</option>
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
          <option value={Importance.True}>Important ★</option>
          <option value={Importance.False}>Not important ☆</option>
        </SelectBox>
      </SelectBoxes>

      <TodoLists>
        {newArr.map((todo, index) => {
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
  background-color: white;
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
