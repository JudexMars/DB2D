import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "providers/AuthProvider";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";

import Authentication from "pages/Authentication";
import Dashboard from "pages/Dashboard";
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
          <Routes>
            <Route path='/auth/*' element={<Authentication />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/settings/*' element={<Settings />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
      <ToastCenter />
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
