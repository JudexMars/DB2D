import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Authentication from "./pages/Authentication";
import GlobalStyles from "./styles/global";
import { baseTheme } from "./styles/theme";

const App = (): JSX.Element => (
  <ThemeProvider theme={baseTheme}>
    <Routes>
      <Route path="/auth/*" element={<Authentication />} />
    </Routes>
    <GlobalStyles />
  </ThemeProvider>
);

export default App;
