import React from "react";
import styled from "@emotion/styled";
import { getColor } from "~/theme/colors";

type BaseProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = BaseProps & {
  label: string;
  name: string;
  id: string;
  errorMessage?: { message: string; errorName: string };
} & {
  isTextArea?: boolean;
  rows?: number;
};

const textAreaProps: any = {
  rows: 10,
};
const Input = (props: InputProps) => {
  const {
    id,
    name,
    label,
    errorMessage,
    rows,
    isTextArea = false,
    ...inputProps
  } = props;

  const errorFieldID = `${id}${errorMessage?.errorName}`;

  const additionalProps = isTextArea ? textAreaProps : {};

  return (
    <InputField>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput
        id={id}
        as={isTextArea ? "textarea" : "input"}
        name={name}
        {...inputProps}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? errorFieldID : undefined}
        {...additionalProps}
      />
      {errorMessage && (
        <p id={errorFieldID} style={{ color: "red" }}>
          {errorMessage.message}
        </p>
      )}
    </InputField>
  );
};

const Label = styled.label`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.2rem;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  gap: 12px;
`;

const StyledInput = styled.input`
  padding: 12px 16px;
  font-size: 1.2rem;
  line-height: 1.2rem;
  border: 2px solid ${getColor("blue2")};

  outline: none;

  :focus-within {
    border: 2px solid ${getColor("pink2")};
  }
`;

export default Input;
