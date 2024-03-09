import { forwardRef } from "react";

import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius}px;
  height: 40px;
`;

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }: ButtonProps, ref): JSX.Element => {
    return (
      <StyledButton ref={ref} {...rest}>
        {children}
      </StyledButton>
    );
  },
);

export default Button;
