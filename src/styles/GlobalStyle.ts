import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    body{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: 'Noto Sans KR', sans-serif;
        width: 100vw;
        height: 100vh;
        background-color: #f1f4fc;
    };
    button{
        display: flex;
        cursor: pointer;
        outline: none;
        border-radius: 3px;
    };
    input{
        display: flex;
        outline: none;
        padding-left: 10px;
    }
`;

export default GlobalStyle;
