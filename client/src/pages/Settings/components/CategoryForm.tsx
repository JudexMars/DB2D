import { styled } from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const StyledTitle = styled.h1`
  font-weight: 600px;
  font-size: 20px;
`;

const StyledDescription = styled.h3`
  font-weight: 400;
  font-size: 16px;
`;

const StyledSeparation = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px 0px 20px 0px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export interface CategoryFormProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const CategoryForm = ({
  title,
  description,
  children,
}: CategoryFormProps): JSX.Element => {
  return (
    <StyledWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      <StyledSeparation />
      {children}
    </StyledWrapper>
  );
};

export default CategoryForm;
