import { useDispatch } from 'src/utils/context';
import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import Arrow from '../../assets/Arrow';
import { STATUS } from 'src/utils/constants';
import Check from 'src/assets/Check';

const statusList = [STATUS.NOT_STARTED, STATUS.ONGOING, STATUS.FINISHED];

const TodoHeader: React.FC = () => {
  const [todoText, setTodoText] = useState<string>('');
  const [goalDate, setGoalDate] = useState<Date>(new Date());
  const [todoStatus, setTodoStatus] = useState<string>(STATUS.NOT_STARTED);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const dispatch = useDispatch();

  const todoTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const {
      target: { value },
    } = event;
    setTodoText(value);
  };

  const submitTodos: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();
    console.log(goalDate.getMonth());
    dispatch({
      type: 'ADD',
      taskName: todoText,
      goalDate: `${goalDate.getFullYear()}-${(goalDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${goalDate.getDate().toString().padStart(2, '0')}`,
      status: todoStatus,
    });
    setTodoText('');
    setIsFocused(false);
  };

  const handleStatusChange = (event: any) => {
    console.log('change');
    const {
      target: { value },
    } = event;
    console.log(event.currentTarget);
    setTodoStatus(value);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <DatePickerButton type="button" onClick={onClick} ref={ref}>
      {value}
    </DatePickerButton>
  ));

  return (
    <HeaderContainer>
      <TodoForm onSubmit={submitTodos}>
        <InputContainer>
          <Label>
            <h3>TASK NAME</h3>
            <TodoInput
              type="text"
              placeholder="What are your plans for today?"
              onChange={todoTextChange}
              value={todoText}
              onFocus={() => setIsFocused(true)}
            />
          </Label>
          {isFocused && (
            <SubInputs>
              <Label>
                <h3>GOAL DATE</h3>
                <DatePicker
                  selected={goalDate}
                  onChange={(date: Date) => setGoalDate(date)}
                  customInput={<ExampleCustomInput />}
                  isClearable
                  closeOnScroll={true}
                />
              </Label>
              <Label>
                <h3>BOARD</h3>
                <Buttons>
                  {statusList.map((status) => (
                    <StatusButton
                      status={status}
                      value={status}
                      onClick={handleStatusChange}
                      type="button"
                    >
                      {status === todoStatus && (
                        <SelectedIcon>
                          <Check />
                        </SelectedIcon>
                      )}
                      {status.toUpperCase()}
                    </StatusButton>
                  ))}
                </Buttons>
              </Label>
            </SubInputs>
          )}
        </InputContainer>
        <SubmitContainer>
          {isFocused && (
            <CloseButton onClick={() => setIsFocused(false)}>X</CloseButton>
          )}
          <TodoSubmit>
            <Arrow />
          </TodoSubmit>
        </SubmitContainer>
      </TodoForm>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 768px;
  position: sticky;
  top: 20px;
`;

const TodoForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f1f4fc;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 10px 10px 20px #cdcfd6, -10px -10px 20px #ffffff;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const Label = styled.div`
  flex: 1;
  display: block;
  padding: 10px;
  color: #5f6c87;
  h3 {
    margin-bottom: 8px;
  }
`;

const TodoInput = styled.input`
  all: unset;
  padding: 10px;
  width: 75%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  border-bottom: 2px solid transparent;
  color: #223358;
  position: relative;
  &::placeholder {
    color: #223358;
    font-size: 18px;
  }

  &:focus {
    border-bottom: 2px solid #5f6c87;
    transition: border-bottom 0.5s linear;
  }
`;

const SubInputs = styled.div`
  display: flex;

  label {
    flex: 1;
  }
`;

const DatePickerButton = styled.button`
  border: none;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #223358;
  height: 27px;
  width: 60%;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  box-sizing: border-box;
  button + button {
    margin-left: 8px;
  }
`;

const StatusButton = styled.button<{ status: string }>`
  border: none;
  padding: 6px 20px;
  position: relative;
  border-radius: 5px;
  background-color: ${(props) =>
    props.status === STATUS.ONGOING
      ? '#e1e3f6'
      : props.status === STATUS.NOT_STARTED
      ? '#5ebb9d'
      : '#ddd'};
  color: ${(props) =>
    props.status === STATUS.ONGOING
      ? '#5e61c5'
      : props.status === STATUS.NOT_STARTED
      ? 'white'
      : 'black'};
`;

const SelectedIcon = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  filter: drop-shadow(0px 0px 1px white) drop-shadow(0px 0px 1px white);
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 40px;
  border: none;
  background: none;
`;

const TodoSubmit = styled.button`
  all: unset;

  padding: 10px;
  cursor: pointer;

  & svg {
    fill: #575ac3;
  }
`;

export default React.memo(TodoHeader);
