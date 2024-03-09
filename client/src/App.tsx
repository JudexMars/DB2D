import styled, { ThemeProvider } from "styled-components";

import Button from "./components/Button";
import Icon from "./components/Icon";
import GlobalStyles from "./styles/global";
import { baseTheme } from "./styles/theme";

const StyledApp = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  & > a {
    color: #61dafb;
  }
`;

const StyledIcon = styled(Icon)`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const App = (): JSX.Element => (
  <ThemeProvider theme={baseTheme}>
    <StyledApp>
      <Header>
        <StyledIcon type="Logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </Button>
      </Header>
    </StyledApp>
    <GlobalStyles />
  </ThemeProvider>
);

export default App;
