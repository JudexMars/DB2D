import { createGlobalStyle } from "styled-components";

import "../fonts";

export default createGlobalStyle`
  *, :root {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  #root {
    height: 100vh;
    width: 100vw;
  }

  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
