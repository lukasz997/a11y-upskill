import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";

export type Option = {
  value: string | number;
  label: string;
};
interface RadioGroupProps {
  options?: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  fieldLabel: string;
}

const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  value,
  options,
  onChange,
  fieldLabel,
}) => {
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let nextValue: string | number = e.target.value;

    if (typeof value === "number") {
      nextValue = e.target.valueAsNumber;
    }

    onChange(nextValue);
  };
  return (
    <StyledRadioContainer role="radiogroup" aria-labelledby="radio-label">
      <StyledHeaderLabel id="radio-label">{fieldLabel}</StyledHeaderLabel>
      {options?.map(({ label, value: itemValue }) => (
        <StyledLabel key={`${itemValue}`}>
          <input
            id={`${itemValue}`}
            type="radio"
            value={itemValue}
            checked={itemValue === value}
            onChange={onValueChange}
          />
          {label}
        </StyledLabel>
      ))}
    </StyledRadioContainer>
  );
};

const StyledRadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledHeaderLabel = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 4px;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.9rem;
  padding-top: 4px;
  padding-bottom: 4px;

  > input {
    margin-right: 4px;
    width: 15px;
    height: 15px;
    margin-top: 0px;
  }
`;

export default RadioGroup;
