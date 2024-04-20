import { t } from "@lingui/macro";
import { FocusEvent, ReactNode, useRef, useState } from "react";
import { css, styled } from "styled-components";

import Icon from "components/Icon";

const StyledSelect = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

interface StyledSelectedItemProps {
  $isActive: boolean;
}

const StyledIcon = styled(Icon)``;

const StyledSelectedItem = styled.div<StyledSelectedItemProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 10px;

  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;

  cursor: pointer;
  user-select: none;

  & ${StyledIcon} {
    transition: transform 0.2s ease-in-out;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      & ${StyledIcon} {
        transform: rotate(-90deg);
      }
    `}
`;

const StyledDefaultSelectedItem = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledDropdown = styled.div`
  position: absolute;
  top: 65px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  height: fit-content;
  padding: 10px;

  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.shadow};
`;

const StyledOption = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  cursor: pointer;
  user-select: none;
`;

export interface Option {
  value: ReactNode;
  onClick?: () => void;
}

interface SelectProps {
  /** Items displayed in the selection options */
  options: Option[];
  /** Option displayed by default. Default - { title: t`Выберите значение` } */
  defaultSelectedItem?: ReactNode;
  /** Allows to control auto selection of initial value. Default - true */
  isDefaultSelect?: boolean;
}

const Select = ({
  options,
  defaultSelectedItem = t`Выберите значение`,
  isDefaultSelect = true,
  ...rest
}: SelectProps): JSX.Element => {
  const selectRef = useRef<HTMLDivElement | null>(null);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(
    isDefaultSelect ? 0 : undefined,
  );

  const [isActive, setIsActive] = useState(true);

  const handleBlur = (e: FocusEvent) => {
    if (selectRef.current !== e.target) {
      setIsActive(false);
    }
  };

  const handleOptionClick = (index: number, cb?: () => void) => {
    setSelectedOptionIndex(index);
    setIsActive(false);
    cb?.();
  };

  const selectedItem =
    selectedOptionIndex !== undefined ? (
      options[selectedOptionIndex].value
    ) : (
      <StyledDefaultSelectedItem>
        {defaultSelectedItem}
      </StyledDefaultSelectedItem>
    );

  return (
    <StyledSelect
      ref={selectRef}
      tabIndex={0}
      onClick={(e) => console.log(e)}
      onBlur={handleBlur}
      {...rest}
    >
      <StyledSelectedItem
        $isActive={isActive}
        onClick={() => setIsActive((value) => !value)}
      >
        {selectedItem}
        <div>
          <StyledIcon type='ArrowLeft' />
        </div>
      </StyledSelectedItem>
      {isActive && (
        <StyledDropdown>
          {options.map(
            (option, index) =>
              selectedOptionIndex !== index && (
                <StyledOption
                  tabIndex={0}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onClick={() => handleOptionClick(index, option.onClick)}
                >
                  {option.value}
                </StyledOption>
              ),
          )}
        </StyledDropdown>
      )}
    </StyledSelect>
  );
};

export default Select;
