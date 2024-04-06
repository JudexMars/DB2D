import { css, styled } from "styled-components";

import profileLogo from "assets/img/profileLogo.png";

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
  $isShadow?: boolean;
}

const StyledImg = styled.img<StyledImgProps>`
  width: 100%;

  ${({ theme, $variant }) => css`
    border-radius: ${theme.avatar.borderRadius[$variant]};
  `}

  ${({ $isShadow }) =>
    $isShadow &&
    css`
      box-shadow: 0px 0px 10px ${({ theme }) => theme.colors.shadow};
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
  isShadow?: boolean;
}

const Avatar = ({
  variant = AvatarVariant.Rounded,
  size,
  isShadow = false,
}: AvatarProps): JSX.Element => {
  return (
    <StyledWrapper>
      <StyledImg
        $variant={variant}
        $size={size}
        $isShadow={isShadow}
        src={profileLogo}
        alt='Profile Logo'
      />
    </StyledWrapper>
  );
};

export default Avatar;
