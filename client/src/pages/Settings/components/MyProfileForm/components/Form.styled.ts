import { css, styled } from "styled-components";

import Button from "components/Button";
import Input from "components/Input";

export const StyledButton = styled(Button)`
  font-size: 16px;
  margin-left: auto;
  padding: 10px 10px;
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

export const WrapperForm = styled.form`
  width: 100%;
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 20px;
`;
