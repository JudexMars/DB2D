import { useAuth } from "providers/AuthProvider";
import { styled } from "styled-components";

import Avatar from "components/Avatar";

const StyledAvatarForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledInfo = styled.div`
  flex-direction: column;
`;

const StyledEmail = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const StyledName = styled.p`
  font-size: 16px;
  font-weight: 300;
`;

interface AvatarFormProps {
  firstname: string;
  lastname: string;
}

const AvatarForm = ({ firstname, lastname }: AvatarFormProps): JSX.Element => {
  const { user } = useAuth();
  // TODO: add changeAvatar from useSettings and Settings Provider;
  return (
    <StyledAvatarForm>
      <Avatar isShadow />
      <StyledInfo>
        <StyledEmail>{user?.email}</StyledEmail>
        <StyledName>{`${firstname} ${lastname}`}</StyledName>
      </StyledInfo>
    </StyledAvatarForm>
  );
};

export default AvatarForm;
