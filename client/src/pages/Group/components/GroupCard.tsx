import { darken } from "polished";
import { styled } from "styled-components";

import Avatar, { AvatarVariant } from "components/Avatar";
import Button from "components/Button";
import Icon from "components/Icon";

export enum GroupCardVariant {
  New = "add",
  Existing = "existing",
}

const StyledGroupCard = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 200px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background-color: ${({ theme }) => darken(0.02, theme.colors.background)};
  }

  &:active {
    background-color: ${({ theme }) => darken(0.05, theme.colors.background)};
  }
`;

const StyledTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.font};
`;

const StyledAddTitle = styled(StyledTitle)`
  font-weight: 400;
`;

interface GroupCardProps {
  variant?: GroupCardVariant;
  title?: string;
}

const GroupCard = ({
  variant = GroupCardVariant.Existing,
  title = "No Title",
}: GroupCardProps): JSX.Element => {
  if (variant === GroupCardVariant.New) {
    return (
      <StyledGroupCard>
        <Icon type='AddPlus' />
        <StyledAddTitle>{title}</StyledAddTitle>
      </StyledGroupCard>
    );
  }

  return (
    <StyledGroupCard>
      <Avatar variant={AvatarVariant.Squared} size={100} isShadow />
      <StyledTitle>{title}</StyledTitle>
    </StyledGroupCard>
  );
};

export default GroupCard;
