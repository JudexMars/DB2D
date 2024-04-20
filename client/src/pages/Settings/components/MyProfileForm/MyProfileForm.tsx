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
  firstname: string;
  lastname: string;
}

const MyProfileForm = (): JSX.Element | null => {
  const { user } = useAuth();

  if (!user?.firstName || !user?.lastName) {
    return null;
  }

  return (
    <StyledMyProfileForm>
      <AvatarForm firstname={user.firstName} lastname={user.lastName} />
      <ChangeNameForm firstname={user.firstName} lastname={user.lastName} />
      <ChangePasswordForm />
    </StyledMyProfileForm>
  );
};

export default MyProfileForm;
