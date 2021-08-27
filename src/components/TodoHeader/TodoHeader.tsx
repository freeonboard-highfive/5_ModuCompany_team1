import { useDispatch } from 'src/utils/context';
import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import Arrow from 'src/assets/Arrow';
import { STATUS } from 'src/utils/constants';
import Check from 'src/assets/Check';
import { getDateString } from 'src/utils/getDateString';
import { ExampleCustomInput } from 'src/components/datePicker/DatePickerButton';

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

    dispatch({
      type: 'ADD',
      taskName: todoText,
      goalDate: getDateString(goalDate),
      status: todoStatus,
    });
    setTodoText('');
    setIsFocused(false);
  };

  const handleStatusChange = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    const {
      currentTarget: { value },
    } = event;

    setTodoStatus(value);
  };

  return (
    <HeaderContainer>
      <TodoForm onSubmit={submitTodos}>
        <InputContainer>
          <Label>
            <h3>TASK NAME</h3>
            <TodoInput
              required
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
                      key={status}
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
            <CloseButton onClick={() => setIsFocused(false)}>✕</CloseButton>
          )}
          <TodoSubmit>
            <Arrow />
          </TodoSubmit>
        </SubmitContainer>
      </TodoForm>
    </HeaderContainer>
  );
};

export default React.memo(TodoHeader);

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 768px;
  position: sticky;
  top: 20px;
  z-index: 2;
  font-family: 'Noto Sans KR', sans-serif;
`;

const TodoForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  backdrop-filter: blur(8px) saturate(180%);
  -webkit-backdrop-filter: blur(8px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
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

  .react-datepicker-wrapper {
    height: 40px;
    display: flex;
    align-items: center;
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

const Buttons = styled.div`
  display: flex;
  box-sizing: border-box;
  button + button {
    margin-left: 8px;
  }
`;

const StatusButton = styled.button<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 6px 20px;
  position: relative;
  font-size: 12px;
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
  all: unset;
  position: absolute;
  align-items: center;
  top: 10px;
  right: 10px;
  font-weight: 900;
  background-color: tomato;
  color: tomato;
  font-size: 8px;
  text-align: center;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    color: brown;
  }
`;

const TodoSubmit = styled.button`
  all: unset;

  padding: 10px;
  cursor: pointer;

  & svg {
    fill: #575ac3;
  }
`;
