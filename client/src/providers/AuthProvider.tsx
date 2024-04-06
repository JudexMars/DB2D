import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Id, toast } from "react-toastify";

export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  accountId: number;
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface SignErrorProps {
  message?: string;
  error?: string;
}

export interface AuthContextProps {
  /** User data. If there are no user data, the authentication page is displayed */
  user?: User;
  /** Function for authorization */
  signIn: (props: SignIn) => void;
  /** Function for registration */
  signUp: (props: SignUp) => void;
  /** Function to exit the application */
  logOut: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();

  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: SignIn) => {
      const signInToastId: Id = toast.loading("Вход в аккаунт");

      try {
        const { data } = (await axios.post("/auth/login", {
          email,
          password,
        })) as { data: User };

        toast.update(signInToastId, {
          render: "Успешная авторизация",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });

        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.update(signInToastId, {
            render: `Ошибка: ${
              (error.response?.data as SignErrorProps).message
                ? (error.response?.data as SignErrorProps).message
                : (error.response?.data as SignErrorProps).error
            }`,
            type: "error",
            autoClose: 3500,
            isLoading: false,
          });
        }
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    }: SignUp) => {
      const signUpToastId: Id = toast.loading("Регистрация");

      try {
        const { data } = (await axios.post("/auth/signup", {
          email,
          firstname: firstName,
          lastname: lastName,
          password,
          confirmPassword,
        })) as { data: User };

        toast.update(signUpToastId, {
          render: "Успешная регистрация",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });

        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.update(signUpToastId, {
            render: `Ошибка: ${
              (error.response?.data as SignErrorProps).message
                ? (error.response?.data as SignErrorProps).message
                : (error.response?.data as SignErrorProps).error
            }`,
            type: "error",
            autoClose: 3500,
            isLoading: false,
          });
        }
      }
    },
  });

  useEffect(() => {
    const userFromStorage = sessionStorage.getItem("user");
    if (userFromStorage) {
      const { email, password } = JSON.parse(userFromStorage);
      signInMutation.mutate({ email, password });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/settings/myProfile", { replace: true });
    } else {
      navigate("/auth/signIn", { replace: true });
    }
    /**
     * navigate is removed from dependencies to avoid
     * triggering the hook after navigating to another url
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const signIn = useCallback((props: SignIn) => {
    signInMutation.mutate(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signUp = useCallback((props: SignUp) => {
    signUpMutation.mutate(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = useCallback(() => {
    sessionStorage.removeItem("user");
    setUser(undefined);
    signInMutation.reset();
    signUpMutation.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      logOut,
    }),
    [logOut, signIn, signUp, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context as AuthContextProps;
};

export { AuthProvider, useAuth };
