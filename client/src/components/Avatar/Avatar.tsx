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
  $size?: number;
}

const StyledImg = styled.img<StyledImgProps>`
  width: 100%;
  ${({ theme, $variant }) => css`
    border-radius: ${theme.avatar.borderRadius[$variant]};
  `}

  ${({ $size }) =>
    $size &&
    css`
      width: ${$size}px;
      height: ${$size}px;
    `}
`;

interface AvatarProps {
  variant?: AvatarVariant;
  size?: number;
}

const Avatar = ({
  variant = AvatarVariant.Rounded,
  size,
}: AvatarProps): JSX.Element => {
  return (
    <StyledWrapper>
      <StyledImg
        $variant={variant}
        $size={size}
        src={profileLogo}
        alt="Profile Logo"
      />
    </StyledWrapper>
  );
};

export default Avatar;
