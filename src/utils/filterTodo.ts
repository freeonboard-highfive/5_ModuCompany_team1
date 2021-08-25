import { useEffect, useState } from 'react';
import { TodoType, UseTodoTypes } from './utilTypes';
import { INITIALTODO } from './constants';

enum Status {
  FINISHED = '완료',
  ONGOING ='진행중',
  NOT_STARTED = '시작안함'
}

enum DateType {
  GoalDate = 'goalDate',
  CreatedAt ='createdAt',
  UpdatedAt = 'updatedAt'
}

enum IMPORTANCE {
  true = 1,
  false = 0,
}

export const FilterTodo = () => {
  const [todos, setTodos] = useState<TodoType[]>(INITIALTODO);
  const [modifiedTodos, setModifiedTodos] = useState<TodoType[]>([])
  const [status, setStatus] = useState<Status | string>("");
  const [dateType, setDateType] = useState<string>('');
  const [importance, setImportance] = useState<boolean | number>(1);

  useEffect(() => {
    // const todo_list = JSON.parse(localStorage.getItem('todoList'))
    // setTodos(Tasks)
  
    // const todo_list: TodoType[] = _todos;
    setTodos(todos);
  }, [todos])  

   const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const target_status: string = e.target.value;
    setStatus(target_status);

    switch (target_status) {
      case '진행중':
        const ongoing_list = todos.filter(todo => todo.status === Status.ONGOING)
        setModifiedTodos(ongoing_list)
        break;

      case '완료':
        const finished_list = todos.filter(todo => todo.status === Status.FINISHED)
        setModifiedTodos(finished_list)
        break;

      case '시작안함':
        const not_started_list = todos.filter(todo => todo.status === Status.NOT_STARTED)
        setModifiedTodos(not_started_list)
        break;

        default:
          setTodos(todos)
    }
  }
  
  const onChangeImportance = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value)
    // const target_importance: boolean = e.target.value;
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
      case 'goalDate':
          const by_goal_date = todos.sort((creat1: TodoType, creat2: TodoType) => Date.parse(creat1.goalDate) - Date.parse(creat2.goalDate))
          setModifiedTodos(by_goal_date)
      break;
      case 'createdAt':
        const by_create_date = todos.sort((creat1: TodoType, creat2: TodoType) => Date.parse(creat2.createdAt) - Date.parse(creat1.createdAt))
          setModifiedTodos(by_create_date)
      break;
      case 'updatedAt':
        const by_update_date = todos.sort((creat1: TodoType, creat2: TodoType) => Date.parse(creat2.updatedAt) - Date.parse(creat1.updatedAt))
          setModifiedTodos(by_update_date)
      break;

      default:
          setTodos(todos)
    }
  }
  return {modifiedTodos,  onChangeStatus, onChangeImportance, sortDateType};
}

