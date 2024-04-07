import { styled } from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 20px;
`;

const StyledTitle = styled.h1`
  font-weight: 600px;
  font-size: 20px;
`;

const StyledDescription = styled.h3`
  font-weight: 400;
  font-size: 16px;
`;

export interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps): JSX.Element => (
  <StyledHeader>
    <StyledTitle>{title}</StyledTitle>
    <StyledDescription>{description}</StyledDescription>
  </StyledHeader>
);

export default Header;
