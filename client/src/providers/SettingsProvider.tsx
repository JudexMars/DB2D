import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { Id, toast } from "react-toastify";

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

interface SettingsErrorProps {
  message?: string;
  error?: string;
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
      const changeNameToastId: Id = toast.loading("Смена имени");
      try {
        await axios.put(
          `/account/${user?.accountId}`,
          { firstname, lastname },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } },
        );

        toast.update(changeNameToastId, {
          render: "Имя изменено",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });

        queryClient.invalidateQueries({ queryKey: ["names"] });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.update(changeNameToastId, {
            render: `Ошибка: ${
              (error.response?.data as SettingsErrorProps).message
                ? (error.response?.data as SettingsErrorProps).message
                : (error.response?.data as SettingsErrorProps).error
            }`,
            type: "error",
            autoClose: 3500,
            isLoading: false,
          });
        }
      }
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async ({ oldPassword, newPassword }: ChangePassword) => {
      const changePasswordToastId: Id = toast.loading("Смена пароля");
      try {
        await axios.put(
          `/account/${user?.accountId}/password`,
          { oldPassword, newPassword },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } },
        );

        toast.update(changePasswordToastId, {
          render: "Пароль изменен",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.update(changePasswordToastId, {
            render: `Ошибка: ${
              (error.response?.data as SettingsErrorProps).message
                ? (error.response?.data as SettingsErrorProps).message
                : (error.response?.data as SettingsErrorProps).error
            }`,
            type: "error",
            autoClose: 3500,
            isLoading: false,
          });
        }
      }
    },
  });

  const changeName = useCallback(
    (props: ChangeName) => {
      changeNameMutation.mutate(props);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const changePassword = useCallback(
    (props: ChangePassword) => {
      changePasswordMutation.mutate(props);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const value = useMemo(
    () => ({
      changeName,
      changePassword,
    }),
    [changeName, changePassword],
  );

  return (
    <SettingsContext.Provider value={value}>
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
