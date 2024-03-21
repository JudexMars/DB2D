import profileLogo from "assets/img/profileLogo.png";
import { css, styled } from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
`;

export enum AvatarVariant {
  Rounded = "rounded",
  Squared = "squared",
}

interface StyledImgProps {
  $variant: AvatarVariant;
}

const StyledImg = styled.img<StyledImgProps>`
  width: 100%;
  ${({ theme, $variant }) => css`
    border-radius: ${theme.avatar.borderRadius[$variant]};
  `}
`;

interface AvatarProps {
  variant?: AvatarVariant;
  width?: number;
}

const Avatar = ({
  variant = AvatarVariant.Rounded,
}: AvatarProps): JSX.Element => {
  return (
    <StyledWrapper>
      <StyledImg
        $variant={variant}
        src={profileLogo}
        alt="Profile Logo"
      ></StyledImg>
    </StyledWrapper>
  );
};

export default Avatar;
