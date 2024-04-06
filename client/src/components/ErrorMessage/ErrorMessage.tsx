import { ReactNode } from "react";
import styled from "styled-components";

const StyledErrorMessage = styled.p`
  color: ${({ theme }) => theme.form.errorColor};
  font-size: 18px;
  font-weight: 500;
`;

export interface ButtonProps {
  children?: ReactNode;
}

const ErrorMessage = ({ children }: ButtonProps): JSX.Element => {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
};

export default ErrorMessage;
