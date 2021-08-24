import React, {useState, useEffect} from 'react'

interface Task {
  id: number;
  taskName: string;
  status: string;
  isImportant: boolean;
  goalDate: string;
  createdAt: string;
  updatedAt: string;
}

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

const Filter: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [modifiedTodos, setModifiedTodos] = useState<Task[]>([])
  const [status, setStatus] = useState<Status | string>("");
  const [dateType, setDateType] = useState<string>('');
  const [importance, setImportance] = useState<boolean | number>(1);
  
  // localStorage.setItem('todoList', JSON.stringify(Tasks));

  useEffect(() => {
    // const todo_list = JSON.parse(localStorage.getItem('todoList'))
    // const todo_list: Task[] = Tasks;
    setTodos(Tasks);
  }, [])  

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
          setTodos(Tasks)
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
          const by_goal_date = todos.sort((creat1: Task, creat2: Task) => Date.parse(creat1.goalDate) - Date.parse(creat2.goalDate))
          setModifiedTodos(by_goal_date)
      break;
      case 'createdAt':
        const by_create_date = todos.sort((creat1: Task, creat2: Task) => Date.parse(creat2.createdAt) - Date.parse(creat1.createdAt))
          setModifiedTodos(by_create_date)
      break;
      case 'updatedAt':
        const by_update_date = todos.sort((creat1: Task, creat2: Task) => Date.parse(creat2.updatedAt) - Date.parse(creat1.updatedAt))
          setModifiedTodos(by_update_date)
      break;

      default:
          setTodos(Tasks)
    }
  }

  return (<div>
    <div>
      <select name="Status" id="Status" onChange={onChangeStatus}>
        <option value={Status.FINISHED}>완료</option>
        <option value={Status.ONGOING}>진행 중</option>
        <option value={Status.NOT_STARTED}>시작 안함</option>
      </select>
    </div>
    <div>
      <select name="Date" id="Date" onChange={sortDateType}>
        <option value={DateType.UpdatedAt}>최신 업데이트 순</option>
        <option value={DateType.CreatedAt}>최신 생성 순</option>
        <option value={DateType.GoalDate}>임박 순</option>
      </select>
    </div>
    <div>
      <select name="Importance" id="Importance" onChange={onChangeImportance}>
        <option value={IMPORTANCE.true}>중요 ★</option>
        <option value={IMPORTANCE.false}>안중요 ☆</option>
      </select>
    </div>

    <ul>
      {modifiedTodos.length ? modifiedTodos.map((el, key) => {
        return (
          <li>
          <span>{el.id}</span>
          <span> ==={el.status}</span>
          <span> =={el.taskName}</span>
          <span> @임박: {el.goalDate}</span>
          <span> @생성{el.createdAt}</span>
          <span> @업뎃{el.updatedAt}</span>
          {el.isImportant ? <div>중요</div> : <div>안중요</div>}
        </li>
        )
      }) : todos.map((el, key) => {
        return (
        <li>
          <span>{el.id}</span>
          <span> =={el.status}</span>
          <span> =={el.taskName}</span>
          <span> @임박{el.goalDate}</span>
          <span> @생성{el.createdAt}</span>
          <span> @업뎃{el.updatedAt}</span>
          {el.isImportant ? <div>중요</div> : <div>안중요</div>}
        </li>
        )
        
      })}
    </ul>
  </div>);
}
export default Filter

// 목데이터
const status = {
	FINISHED: '완료',
	ONGOING: '진행중',
	NOT_STARTED: '시작안함'
}

// const importance ={
// 	NOT_IMPORTANT: 1,
// 	IMPORTANT: 2,
// }

const Tasks: Task[] = [
  {
    id: 1,
    taskName: '자소서 쓰기',
    status: status.ONGOING,
    isImportant: true,
    goalDate: '2030-08-31',
    createdAt: '2021-02-03',
    updatedAt: '2021-08-10'
  },
  {
    id: 2,
    taskName: '면접',
    status: status.NOT_STARTED,
    isImportant: false,
    goalDate: '2010-10-31',
    createdAt: '2009-01-08',
    updatedAt: '2010-08-07'
  },
  {
    id: 3,
    taskName: '밥먹기',
    status: status.FINISHED,
    isImportant: true,
    goalDate: '2023-07-31',
    createdAt: '2019-01-03',
    updatedAt: '2020-11-22'
  },
  {
    id: 4,
    taskName: '친구 만나기',
    status: status.NOT_STARTED,
    isImportant: true,
    goalDate: '2032-06-03',
    createdAt: '1995-02-02',
    updatedAt: '2020-03-07'
  },
  {
    id: 5,
    taskName: '배고프기',
    status: status.FINISHED,
    isImportant: false,
    goalDate: '2022-08-12',
    createdAt: '2021-02-02',
    updatedAt: '2021-03-07'
  },
  {
    id: 6,
    taskName: '강아지키우기',
    status: status.ONGOING,
    isImportant: false,
    goalDate: '2040-01-16',
    createdAt: '2021-08-25',
    updatedAt: '2022-11-11'
  },
  {
    id: 7,
    taskName: '여행가기',
    status: status.NOT_STARTED,
    isImportant: true,
    goalDate: '2022-01-15',
    createdAt: '2021-02-02',
    updatedAt: '2022-01-01'
  }

]