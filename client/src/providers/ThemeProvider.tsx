import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import {
  DefaultTheme,
  ThemeProvider as ThemeProviderStyledComponents,
} from "styled-components";

import { ThemeType } from "styles/styled";
import { darkTheme, lightTheme } from "styles/theme";

const DARK_MEDIA = "(prefers-color-scheme: dark)";

export interface ThemeContextProps {
  /** Current theme */
  theme: DefaultTheme;
  /** Function for set theme */
  setTheme: (type: ThemeType) => void;
  /** Function for toggle theme */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

function getPreferredColorType(): DefaultTheme {
  if (window.matchMedia) {
    if (window.matchMedia(DARK_MEDIA).matches) {
      return darkTheme;
    }
  }
  return lightTheme;
}

const ThemeProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<DefaultTheme>(getPreferredColorType);

  const setPreferredColorType = useCallback((event: MediaQueryListEvent) => {
    if (event.matches) {
      return setTheme(darkTheme);
    }
    return setTheme(lightTheme);
  }, []);

  useEffect(() => {
    window
      .matchMedia(DARK_MEDIA)
      .addEventListener("change", setPreferredColorType);

    return () => {
      window
        .matchMedia(DARK_MEDIA)
        .removeEventListener("change", setPreferredColorType);
    };
  }, [setPreferredColorType]);

  const setThemeType = useCallback((type: ThemeType) => {
    setTheme(type === ThemeType.Light ? lightTheme : darkTheme);
    toast.success("Тема успешно изменилась");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t.type === ThemeType.Light ? darkTheme : lightTheme));
    toast.success("Тема успешно изменилась");
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme: setThemeType,
      toggleTheme,
    }),
    [theme, toggleTheme, setThemeType],
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProviderStyledComponents theme={theme}>
        {children}
      </ThemeProviderStyledComponents>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context as ThemeContextProps;
};

export { ThemeProvider, useTheme };
