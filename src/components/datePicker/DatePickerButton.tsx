import { forwardRef, RefObject } from 'react';
import { ReactDatePickerProps } from 'react-datepicker';
import styled from 'styled-components';

interface datePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  onClick?(): void;
  onChange?(): void;
}
export const ExampleCustomInput = forwardRef(
  (
    { value, onClick }: datePickerProps,
    ref:
      | ((instance: HTMLButtonElement | null) => void)
      | RefObject<HTMLButtonElement>
      | null
      | undefined,
  ) => (
    <DatePickerButton type="button" onClick={onClick} ref={ref}>
      {value ? value : 'None'}
    </DatePickerButton>
  ),
);

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
