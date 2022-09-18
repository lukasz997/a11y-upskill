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
  autoComplete?: string;
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
    autoComplete,
    isTextArea = false,
    ...inputProps
  } = props;

  const errorFieldID = `${id}${errorMessage?.errorName}`;

  const additionalProps = isTextArea ? textAreaProps : {};

  return (
    <InputField>
      <Label htmlFor={id}>
        {label}
        {inputProps.required && `*`}
      </Label>
      <StyledInput
        id={id}
        as={isTextArea ? "textarea" : "input"}
        name={name}
        autoComplete={autoComplete}
        {...inputProps}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? errorFieldID : undefined}
        {...additionalProps}
      />
      {errorMessage && (
        <ErrorMessage id={errorFieldID}>{errorMessage.message}</ErrorMessage>
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

const ErrorMessage = styled.p`
  color: #d00000;
`;

export default Input;
