import { Link } from "react-router-dom";
import { css, styled } from "styled-components";

import Button from "components/Button";
import Input from "components/Input";

export const WrapperForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: max-content;
  gap: 30px;
`;

export const TitleForm = styled.div`
  font-size: 40px;
  font-weight: 700;
`;

export const WrapperInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 5px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.link.primary};
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;

interface StyledInputProps {
  $isError: boolean;
}

export const StyledInput = styled(Input)<StyledInputProps>`
  ${({ theme, $isError }) =>
    $isError &&
    css`
      border-color: ${theme.form.errorColor};
    `}
`;
