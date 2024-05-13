import Button from "components/Button";
import Input from "components/Input";
import { css, styled } from "styled-components";

export const StyledContentModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 20px;
  max-width: 20vw;
`;

export const StyledTextModal = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: ${({theme}) => theme.form.input.colors.placeholder};
`;

export const SeparatorModel = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({theme}) => theme.colors.border };
`;

export const StyledButtonWrapperModal = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px;
`

export const StyledButton = styled(Button)`
  font-size: 16px;
  font-weight: 500px;
  padding: 10px;
`;

export const StyledWrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 25vw;
`

export interface StyledInputProps {
  $isError: boolean;
}

export const StyledInput = styled(Input)<StyledInputProps>`
  ${({ theme, $isError }) =>
    $isError &&
    css`
      border-color: ${theme.form.errorColor};
    `}
`;