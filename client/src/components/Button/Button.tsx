import { forwardRef } from "react";

import { lighten } from "polished";
import styled from "styled-components";

export enum ButtonVariant {
  Primary = "primary",
  Disable = "disable",
}

interface StyledButtonProps {
  $variant: ButtonVariant;
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: 15px 20px;
  color: ${({ theme, $variant }) => theme.button[$variant].color};
  background-color: ${({ theme, $variant }) =>
    theme.button[$variant].background};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius}px;
  font-size: 24px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme, $variant }) =>
      lighten(0.05, theme.button[$variant].background)};
  }

  &:active {
    background-color: ${({ theme, $variant }) =>
      lighten(0.02, theme.button[$variant].background)};
  }
`;

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = ButtonVariant.Primary, children, ...rest }: ButtonProps,
    ref,
  ): JSX.Element => {
    return (
      <StyledButton ref={ref} $variant={variant} type="button" {...rest}>
        {children}
      </StyledButton>
    );
  },
);

export default Button;
