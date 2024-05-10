import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "providers/AuthProvider";
import { styled } from "styled-components";

import AvatarForm from "./components/AvatarForm";
import ChangeNameForm from "./components/ChangeNameForm";
import ChangePasswordForm from "./components/ChangePasswordFrom";

export const StyledMyProfileForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  flex-direction: column;
  max-width: max-content;
  gap: 30px;
`;

export interface AccountInfo {
  firstName: string;
  lastName: string;
}

const MyProfileForm = (): JSX.Element | null => {
  const { user } = useAuth();

  const { isLoading, data } = useQuery({
    queryKey: ["names"],
    queryFn: async (): Promise<AccountInfo> => {
      const { data: account } = (await axios.get(`/account/${user?.id}`)) as {
        data: AccountInfo;
      };

      return account;
    },
  });

  if (isLoading || !data?.firstName || !data?.lastName) {
    return null;
  }

  return (
    <StyledMyProfileForm>
      <AvatarForm firstname={data.firstName} lastname={data.lastName} />
      <ChangeNameForm firstname={data.firstName} lastname={data.lastName} />
      <ChangePasswordForm />
    </StyledMyProfileForm>
  );
};

export default MyProfileForm;
