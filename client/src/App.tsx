import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "providers/AuthProvider";
import { GroupProvider } from "providers/GroupProvider";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";

import Authentication from "pages/Authentication";
import Dashboard from "pages/Dashboard";
import Group from "pages/Group";
import Settings from "pages/Settings";

import ToastCenter from "components/ToastCenter";

import GlobalStyles from "./styles/global";
import { baseTheme } from "./styles/theme";

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={baseTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GroupProvider>
            <Routes>
              <Route path='/auth/*' element={<Authentication />} />
              <Route path='/group/*' element={<Group />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/settings/*' element={<Settings />} />
            </Routes>
          </GroupProvider>
        </AuthProvider>
      </QueryClientProvider>
      <ToastCenter />
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
