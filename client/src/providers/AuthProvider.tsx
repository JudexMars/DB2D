import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface SignIn {
  login: string;
  password: string;
}

export interface SignUp {
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  account_id: number;
  access_token: string;
  refresh_token: string;
  username: string;
}

interface AuthContextProps {
  user?: User;
  signIn: (props: SignIn) => void;
  signUp: (props: SignUp) => void;
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
    mutationFn: async ({ login, password }: SignIn) => {
      const user = (await axios.post("/auth/login", {
        username: login,
        password,
      })) as User;

      setUser(user);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({
      login,
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    }: SignUp) => {
      const user = (await axios.post("/auth/signup", {
        username: login,
        email,
        firstname: firstName,
        lastname: lastName,
        password,
        confirm_password: confirmPassword,
      })) as User;

      setUser(user);
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/auth/signIn", { replace: true });
    }
    /**
     * navigate is removed from dependencies to avoid
     * triggering the hook after navigating to another url
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const signIn = useCallback(
    (props: SignIn) => {
      signInMutation.mutate(props);
    },
    [signInMutation],
  );

  const signUp = useCallback(
    (props: SignUp) => {
      signUpMutation.mutate(props);
    },
    [signUpMutation],
  );

  const logOut = useCallback(() => {
    setUser(undefined);
    signInMutation.reset();
    signUpMutation.reset();
  }, [signInMutation, signUpMutation]);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context as AuthContextProps;
};

export { AuthProvider, useAuth };
