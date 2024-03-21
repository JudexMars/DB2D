import { forwardRef } from "react";

import styled from "styled-components";

export enum ButtonVariant {
  Primary = "primary",
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
  }
`;

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
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
