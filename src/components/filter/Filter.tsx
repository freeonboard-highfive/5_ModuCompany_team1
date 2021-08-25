import React, {useState, useEffect} from 'react'
import TodoItem from 'src/components/todoItem/TodoItem';
import styled from 'styled-components';
import { TodoType } from 'src/utils/utilTypes';
import { Status, DateType, IMPORTANCE} from 'src/utils/filterEnum'

interface TodoItemTypes {
  _todos: TodoType[];
  deleteTodo: (id: number) => void;
  editTodo: (id: number, name: string, value: string | boolean) => void;
}

const Filter: React.FC<TodoItemTypes> = ({_todos, deleteTodo, editTodo}) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [modifiedTodos, setModifiedTodos] = useState<TodoType[]>([])
  const [status, setStatus] = useState<Status | string>("");
  const [dateType, setDateType] = useState<string>('');
  const [importance, setImportance] = useState<boolean | number | null>(null);

  useEffect(() => {
    const todo_list: TodoType[] = _todos;
    setTodos(todo_list);
  }, [_todos])  

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const target_status: string = e.target.value;
    setStatus(target_status);

    switch (target_status) {
      case Status.ONGOING:
        const ongoing_list = todos.filter(todo => todo.status === Status.ONGOING)
        setModifiedTodos(ongoing_list)
        break;
      case Status.FINISHED:
        const finished_list = todos.filter(todo => todo.status === Status.FINISHED)
        setModifiedTodos(finished_list)
        break;
      case Status.NOT_STARTED:
        const not_started_list = todos.filter(todo => todo.status === Status.NOT_STARTED)
        setModifiedTodos(not_started_list)
        break;
        default:
          setTodos(todos)
    }
  }
  
  const onChangeImportance = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setImportance(Number(e.target.value))

    if (importance) {
      const important_list = todos.filter(todo => !todo.isImportant);
      setModifiedTodos(important_list)
      setImportance(false)
    }
    if (!importance) {
      const unimportant_list = todos.filter(todo => todo.isImportant);
      setModifiedTodos(unimportant_list)
      setImportance(true)
    }
  }

  const sortDateType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const date_type = e.target.value;
    setDateType(date_type)
    
    switch (date_type) {
      case DateType.GoalDate:
          const by_goal_date = todos.sort((creat1: TodoType, creat2: TodoType) => Date.parse(creat1.goalDate) - Date.parse(creat2.goalDate))
          setModifiedTodos(by_goal_date)
      break;
      case DateType.CreatedAt:
        const by_create_date = todos.sort((creat1: TodoType, creat2: TodoType) => Date.parse(creat2.createdAt) - Date.parse(creat1.createdAt))
          setModifiedTodos(by_create_date)
      break;
      case DateType.UpdatedAt:
        const by_update_date = todos.sort((creat1: TodoType, creat2: TodoType) => Date.parse(creat2.updatedAt) - Date.parse(creat1.updatedAt))
          setModifiedTodos(by_update_date)
      break;

      default:
          setTodos(todos)
    }
  }

  return (
    <div>
      <SelectBoxes>
      <div>
        <SelectBox name="Status" id="Status" onChange={onChangeStatus}>
          <option selected>Status</option>
          <option value={Status.FINISHED}>완료</option>
          <option value={Status.ONGOING}>진행 중</option>
          <option value={Status.NOT_STARTED}>시작 안함</option>
        </SelectBox>
      </div>
      <div>
        <SelectBox name="Date" id="Date" onChange={sortDateType}>
        <option selected>Date</option>
          <option value={DateType.UpdatedAt}>최신 업데이트 순</option>
          <option value={DateType.CreatedAt}>최신 생성 순</option>
          <option value={DateType.GoalDate}>임박 순</option>
        </SelectBox>
      </div>
      <div>
        <SelectBox name="Importance" id="Importance" onChange={onChangeImportance}>
          <option selected>Importance</option>
          <option value={IMPORTANCE.true}>중요 ★</option>
          <option value={IMPORTANCE.false}>안중요 ☆</option>
        </SelectBox>
      </div>
      </SelectBoxes>

      <TodoLists>
        {modifiedTodos.length ?
        modifiedTodos.map((todo, key) => {
          return (
            <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
          )
        }):
        todos.map((todo, key) => {
          return (
            <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
          )
        })
        }
        </TodoLists>
    </div>
  );
}
export default Filter

const SelectBoxes = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid lightgray;
`
const SelectBox = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg) no-repeat 95% 50%;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    outline: none;
  }
  width: 200px;
  padding: 17px 26px 15px 20px;
  border: 0px solid lightgray;
  border-radius: 50px;
  font-size: 19px;
  color: #646363;
`
const TodoLists = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 25px;
  padding: 0px 25px;
`;