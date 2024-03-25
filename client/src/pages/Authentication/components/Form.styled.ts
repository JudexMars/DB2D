import Button from "components/Button";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

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

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.link.primary};
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;
