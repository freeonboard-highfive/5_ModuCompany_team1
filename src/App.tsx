import styled from 'styled-components';
import TodoList from './pages/TodoList';

function App() {
  return (
    <TodoContainer>
      <TodoList />
    </TodoContainer>
  );
}

const TodoContainer = styled.div`
  width: 1080px;
  margin: 0 auto;
`;

export default App;
