import React, {useState, useEffect} from 'react'

const Filter: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [modifiedTodos, setModifiedTodos] = useState<Task[]>([])
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [importance, setImportance] = useState<string>("");
  
  // localStorage.setItem('todoList', JSON.stringify(Tasks));

  useEffect(() => {
    // const todo_list = JSON.parse(localStorage.getItem('todoList'))
    // const todo_list: Task[] = Tasks;
    setTodos(Tasks);
    setModifiedTodos(Tasks)
  }, [])  

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const target_status: string = e.target.value;
    setStatus(target_status);

    switch (target_status) {
      case 'ongoing':
        const ongoing_list = todos.filter(todo => todo.status === '진행중')
        setModifiedTodos(ongoing_list)
        break;

      case 'finished':
        const finished_list = todos.filter(todo => todo.status === '완료')
        setModifiedTodos(finished_list)
        break;

      case 'not_started':
        const not_started_list = todos.filter(todo => todo.status === '시작안함')
        setModifiedTodos(not_started_list)
        // setModifiedTodos(todos.filter(todo => todo.status === '시작안함'))
        break;

        default:
          setTodos(Tasks)
    }
  }
  
  const onChangeImportance = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const target_importance: string = e.target.value;
    setImportance(target_importance)

    if (target_importance === "important") {
      const important_list = todos.filter(todo => todo.importance === 2)
      return setModifiedTodos(important_list)
    }
    if (target_importance === "not_important") {
      const unimportant_list = todos.filter(todo => todo.importance === 1)
      return setModifiedTodos(unimportant_list)
    }
  }
  return (<div>
    <div>
      <select name="Status" id="Status" onChange={onChangeStatus}>
        <option value="finished">완료</option>
        <option value="ongoing">진행 중</option>
        <option value="not_started">시작 안함</option>
      </select>
    </div>
    <div>
      <select name="Date" id="Date">
        <option value="update">최신 업데이트 순</option>
        <option value="creact">최신 생성 순</option>
        <option value="goal">임박 순</option>
      </select>
    </div>
    <div>
      <select name="Importance" id="Importance" onChange={onChangeImportance}>
        <option value="important">중요 ★</option>
        <option value="not_important">안중요 ☆</option>
        {/* <option value=""></option> */}
      </select>
    </div>

    <ul>
      {modifiedTodos.length ? modifiedTodos.map((el, key) => {
        return (
          <li>
          <span>{el.id}</span>
          <span> ===={el.status}</span>
          <span> =={el.taskName}</span>
          <span> =={el.goalDate}</span>
          <span> =={el.createdAt}</span>
          <span> =={el.updatedAt}</span>
          <span> =={el.importance}</span>
        </li>
        )
      }) : todos.map((el, key) => {
        <li>
          <span>{el.id}</span>
          <span> ===={el.status}</span>
          <span> =={el.taskName}</span>
          <span> =={el.goalDate}</span>
          <span> =={el.createdAt}</span>
          <span> =={el.updatedAt}</span>
          <span> =={el.importance}</span>
        </li>
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

const importance ={
	NOT_IMPORTANT: 1,
	IMPORTANT: 2,
	// VERY_IMPORTANT: 3
}
interface Task {
  id: number;
  taskName: string;
  status: string;
  importance: number;
  goalDate: string;
  createdAt: string;
  updatedAt: string;
}
const Tasks: Task[] = [
  {
    id: 1,
    taskName: '자소서 쓰기',
    status: status.ONGOING,
    importance: importance.IMPORTANT,
    goalDate: '2021-08-31',
    createdAt: '2021-02-03',
    updatedAt: '2021-07-07'
  },
  {
    id: 2,
    taskName: '면접',
    status: status.NOT_STARTED,
    importance: importance.IMPORTANT,
    goalDate: '2021-10-31',
    createdAt: '2021-01-08',
    updatedAt: '2021-02-07'
  },
  {
    id: 3,
    taskName: '밥먹기',
    status: status.FINISHED,
    importance: importance.NOT_IMPORTANT,
    goalDate: '2020-08-31',
    createdAt: '2021-01-03',
    updatedAt: '2021-01-03'
  },
  {
    id: 4,
    taskName: '친구 만나기',
    status: status.NOT_STARTED,
    importance: importance.NOT_IMPORTANT,
    goalDate: '2021-08-33',
    createdAt: '2021-02-02',
    updatedAt: '2021-03-07'
  },
  {
    id: 5,
    taskName: '배고프기',
    status: status.NOT_STARTED,
    importance: importance.NOT_IMPORTANT,
    goalDate: '2021-08-33',
    createdAt: '2021-02-02',
    updatedAt: '2021-03-07'
  }
]