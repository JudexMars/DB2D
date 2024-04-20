import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { messages as en } from "locales/en/messages";
import { messages as ru } from "locales/ru/messages";
import { AuthProvider } from "providers/AuthProvider";
import { ThemeProvider } from "providers/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Authentication from "pages/Authentication";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";

import ToastCenter from "components/ToastCenter";

import GlobalStyles from "./styles/global";

i18n.load({
  en,
  ru,
});
i18n.activate("en");

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <I18nProvider i18n={i18n}>
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
    </I18nProvider>
  );
};

export default App;
