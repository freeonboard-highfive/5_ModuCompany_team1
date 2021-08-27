import { forwardRef } from 'react';
import styled from 'styled-components';

export const ExampleCustomInput = forwardRef(
  ({ value, onClick }: any, ref: any) => (
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
