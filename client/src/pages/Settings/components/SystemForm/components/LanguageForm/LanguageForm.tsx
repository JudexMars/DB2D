import { i18n } from "@lingui/core";
import { styled } from "styled-components";

import Select, { Option } from "components/Select";

import OptionValue from "./components/OptionValue";

const StyledLanguageForm = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledSelect = styled(Select)`
  width: 125px;
`;

const LanguageForm = (): JSX.Element => {
  const options: Option[] = [
    {
      value: <OptionValue icon='RussiaFlag' title='RU' />,
      onClick: () => i18n.activate("ru"),
    },
    {
      value: <OptionValue icon='UsaFlag' title='EN' />,
      onClick: () => i18n.activate("en"),
    },
  ];

  return (
    <StyledLanguageForm>
      <StyledSelect options={options} isDefaultSelect={false} />
    </StyledLanguageForm>
  );
};

export default LanguageForm;
