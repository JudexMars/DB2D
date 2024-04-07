import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "providers/AuthProvider";
import { ThemeProvider } from "providers/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Authentication from "pages/Authentication";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";

import ToastCenter from "components/ToastCenter";

import GlobalStyles from "./styles/global";

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
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
