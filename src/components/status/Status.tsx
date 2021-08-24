import React, { useState } from 'react'
import styled from 'styled-components';

const Select = styled.select``;

const Options = styled.option``;

const Status = () => {
    const optionList = ['Todo', 'Doing', 'Done'];
    const [value, setValue] = useState('Todo')

    const handleChange = (e: any) => {
        setValue(e.target.value);
    }

    return (
        <>
            <Select value={value} onChange={handleChange}>
                {optionList.map((item) => (
                    <Options value={item} key={item}>
                        {item}
                    </Options>
                ))}
            </Select>
            {console.log(value)}
        </>
    )
}

export default Status
