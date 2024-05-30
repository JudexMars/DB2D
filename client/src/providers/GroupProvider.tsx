import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
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

import { Group, useAuth } from "./AuthProvider";

export interface Member {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface CreateGroup {
  name: string;
  description?: string;
}

export interface SelectActiveGroup {
  id: number;
}

export interface SetGroupInfo {
  name: string;
  description: string;
}

export interface InviteUser {
  email: string;
}

export interface KickMember {
  accountId: number;
}

export interface SetRole {
  groupId: number;
  accountId: number;
  newRole: string;
}

interface GroupErrorProps {
  message?: string;
  error?: string;
}

interface GroupProviderProps {
  children: ReactNode;
}

export interface GroupContextProps {
  /** Selected group data. If there are no group data, group selection page displayed */
  activeGroup?: Group;
  fetchActiveGroupQuery: UseQueryResult<Group, Error>;
  fetchGroupsQuery: UseQueryResult<Group[], Error>;
  fetchGroupMembersQuery: UseQueryResult<Member[], Error>;
  /** Function for group creation */
  createGroup: (props: CreateGroup) => void;
  /** Function for changing user's role in group */
  selectActiveGroupState: (props: SelectActiveGroup) => void;
  setGroupInfo: (props: SetGroupInfo) => void;
  inviteUser: (props: InviteUser) => void;
  kickMember: (props: KickMember) => void;
  setRole: (props: SetRole) => void;
}

const GroupContext = createContext<GroupContextProps | null>(null);

const GroupProvider = ({ children }: GroupProviderProps): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeGroup, setActiveGroup] = useState<Group>();

  const createGroupMutation = useMutation({
    mutationFn: async ({ name, description = "none" }: CreateGroup) => {
      const createGroupToastId: Id = toast.loading("Создание группы");

      try {
        const { data } = (await axios.post(
          "/group",
          { name, description },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } },
        )) as { data: Group };

        toast.update(createGroupToastId, {
          render: "Группа успешно создана",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });

        setActiveGroup(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.update(createGroupToastId, {
            render: `Ошибка: ${
              (error.response?.data as GroupErrorProps).message
                ? (error.response?.data as GroupErrorProps).message
                : (error.response?.data as GroupErrorProps).error
            }`,
            type: "error",
            autoClose: 3500,
            isLoading: false,
          });
        }
      }
    },
  });

  const fetchActiveGroupQuery = useQuery({
    queryKey: ["group", activeGroup?.id],
    enabled: false,
    queryFn: async (): Promise<Group> => {
      const { data: group } = (await axios.get(`/group/${activeGroup?.id}`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      })) as {
        data: Group;
      };

      setActiveGroup(group);
      return group;
    },
  });

  const fetchGroupsQuery = useQuery({
    queryKey: ["groups"],
    enabled: false,
    queryFn: async (): Promise<Group[]> => {
      const { data } = (await axios.get(`/group`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      })) as { data: Group[] };

      return data;
    },
  });

  const fetchGroupMembersQuery = useQuery({
    queryKey: ["members"],
    enabled: false,
    queryFn: async (): Promise<Member[]> => {
      const { data } = (await axios.get(`/group/${activeGroup?.id}/members`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      })) as { data: Member[] };

      return data;
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectActiveGroupState = ({ id }: SelectActiveGroup) => {
    const groupToSelect = user?.groups.find((group) => group.id === id);
    if (groupToSelect) {
      setActiveGroup(groupToSelect);
    } else {
      toast.error("Группа не найдена");
    }
  };

  const setGroupInfoMutation = useMutation({
    mutationFn: async ({ name, description }: SetGroupInfo) => {
      const setGroupInfoId: Id = toast.loading("Изменение инфморации о группе");

      try {
        const { data } = (await axios.put(
          `/group/${activeGroup?.id}`,
          { name, description },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } },
        )) as { data: Group };

        toast.update(setGroupInfoId, {
          render: "Информация о группе успешно изменена",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });

        setActiveGroup(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.update(setGroupInfoId, {
            render: `Ошибка: ${
              (error.response?.data as GroupErrorProps).message
                ? (error.response?.data as GroupErrorProps).message
                : (error.response?.data as GroupErrorProps).error
            }`,
            type: "error",
            autoClose: 3500,
            isLoading: false,
          });
        }
      }
    },
  });

  const inviteUserMutation = useMutation({
    mutationFn: async ({ email }: InviteUser) => {
      const inviteUserToastId: Id = toast.loading("Приглашаем пользователя");
      try {
        await axios.post(
          `/group/${activeGroup?.id}/invite`,
          { email },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } },
        );

        toast.update(inviteUserToastId, {
          render: "Роль успешно изменена",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (axios.isAxiosError(error)) {
            toast.update(inviteUserToastId, {
              render: `Ошибка: ${
                (error.response?.data as GroupErrorProps).message
                  ? (error.response?.data as GroupErrorProps).message
                  : (error.response?.data as GroupErrorProps).error
              }`,
              type: "error",
              autoClose: 3500,
              isLoading: false,
            });
          }
        }
      }
    },
  });

  const kickMemberMutation = useMutation({
    mutationFn: async ({ accountId }: KickMember) => {
      const kickMemberToastId: Id = toast.loading("Выгоняем участника");
      try {
        await axios.put(
          `/group/${activeGroup?.id}/kick`,
          { accountId },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } },
        );

        toast.update(kickMemberToastId, {
          render: "Участник выгнан",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (axios.isAxiosError(error)) {
            toast.update(kickMemberToastId, {
              render: `Ошибка: ${
                (error.response?.data as GroupErrorProps).message
                  ? (error.response?.data as GroupErrorProps).message
                  : (error.response?.data as GroupErrorProps).error
              }`,
              type: "error",
              autoClose: 3500,
              isLoading: false,
            });
          }
        }
      }
    },
  });

  const setUserRoleMutation = useMutation({
    mutationFn: async ({ groupId, accountId, newRole }: SetRole) => {
      const setRoleToastId: Id = toast.loading("Изменение роли");

      try {
        await axios.put(
          `/group/${groupId}/role`,
          { accountId, newRole },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } },
        );

        toast.update(setRoleToastId, {
          render: "Роль успешно изменена",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.update(setRoleToastId, {
            render: `Ошибка: ${
              (error.response?.data as GroupErrorProps).message
                ? (error.response?.data as GroupErrorProps).message
                : (error.response?.data as GroupErrorProps).error
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
    if (activeGroup) {
      sessionStorage.setItem("activeGroup", JSON.stringify(activeGroup));
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/group/select", { replace: true });
    }
    /**
     * navigate is removed from dependencies to avoid
     * triggering the hook after navigating to another url
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGroup]);

  const createGroup = useCallback((props: CreateGroup) => {
    createGroupMutation.mutate(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setGroupInfo = useCallback((props: SetGroupInfo) => {
    setGroupInfoMutation.mutate(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inviteUser = useCallback((props: InviteUser) => {
    inviteUserMutation.mutate(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const kickMember = useCallback((props: KickMember) => {
    kickMemberMutation.mutate(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRole = useCallback((props: SetRole) => {
    setUserRoleMutation.mutate(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      activeGroup,
      fetchActiveGroupQuery,
      fetchGroupsQuery,
      fetchGroupMembersQuery,
      createGroup,
      selectActiveGroupState,
      setGroupInfo,
      inviteUser,
      kickMember,
      setRole,
    }),
    [
      activeGroup,
      fetchActiveGroupQuery,
      fetchGroupsQuery,
      fetchGroupMembersQuery,
      createGroup,
      selectActiveGroupState,
      setGroupInfo,
      inviteUser,
      kickMember,
      setRole,
    ],
  );

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

const useGroup = () => {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context as GroupContextProps;
};

export { GroupProvider, useGroup };
export type { Group };
