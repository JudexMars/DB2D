import { ReactNode, createContext, useCallback, useContext } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useAuth } from "./AuthProvider";

export interface ChangeName {
  firstname: string;
  lastname: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface SettingsContextProps {
  /** Function to change current user's name */
  changeName: (props: ChangeName) => void;
  /** Function to change current user's password */
  changePassword: (props: ChangePassword) => void;
}

interface SettingsProviderProps {
  children: ReactNode;
}

const SettingsContext = createContext<SettingsContextProps | null>(null);

const SettingsProvider = ({ children }: SettingsProviderProps): JSX.Element => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const changeNameMutation = useMutation({
    mutationFn: async ({ firstname, lastname }: ChangeName) => {
      await axios.put(
        `/account/${user?.accountId}`,
        { firstname, lastname },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } },
      );

      queryClient.invalidateQueries({ queryKey: ["names"] });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async ({ oldPassword, newPassword }: ChangePassword) => {
      await axios.put(
        `/account/${user?.accountId}/password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } },
      );
    },
  });

  const changeName = useCallback(
    (props: ChangeName) => {
      changeNameMutation.mutate(props);
    },
    [changeNameMutation],
  );

  const changePassword = useCallback(
    (props: ChangePassword) => {
      changePasswordMutation.mutate(props);
    },
    [changePasswordMutation],
  );

  return (
    <SettingsContext.Provider value={{ changeName, changePassword }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context as SettingsContextProps;
};

export { SettingsProvider, useSettings };
