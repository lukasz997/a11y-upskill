import React, { FunctionComponent } from "react";
import { Controller } from "react-hook-form";
import Button from "../button/button";
import Input from "../input";
import DateInput from "../input/date-input";
import { FormProps } from "./report-form.hooks";
import { Form } from "./styled";

interface FirstStepProps extends FormProps {}

const FirstStep: FunctionComponent<FirstStepProps> = ({
  control,
  onContinue,
}) => {
  const onInternalSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onContinue();
  };

  return (
    <Form onSubmit={onInternalSubmit}>
      <h2>Personal details</h2>
      <Controller
        control={control}
        name="firstStep.firstName"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            id="firstName"
            name="First name"
            label="First name"
            autoComplete="given-name"
            value={value}
            onChange={onChange}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
            required={true}
          />
        )}
      />

      <Controller
        control={control}
        name="firstStep.lastName"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            id="lastName"
            name="Last name"
            label="Last name"
            autoComplete="family-name"
            value={value}
            onChange={onChange}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
            required={true}
          />
        )}
      />

      <Controller
        control={control}
        name="firstStep.birthday"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DateInput
            id="birthday"
            label="Birthday"
            name="birthday"
            autoComplete="bday"
            value={value}
            onChange={onChange}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
            required={true}
          />
        )}
      />

      <Controller
        control={control}
        name="firstStep.phoneNumber"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            id="phoneNumber"
            name="Phone number"
            label="Phone number"
            value={value}
            type="number"
            autoComplete="tel"
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
            required={true}
          />
        )}
      />

      <Controller
        control={control}
        name="firstStep.policyNumber"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            id="policyNumber"
            name="Policy number"
            label="Policy number"
            autoComplete="off"
            value={value}
            onChange={onChange}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
            required={true}
          />
        )}
      />

      <Controller
        control={control}
        name="firstStep.email"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            id="email"
            name="Email"
            autoComplete="email"
            label="Email"
            value={value}
            onChange={onChange}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
            required={true}
          />
        )}
      />

      <Button
        type="submit"
        aria-label="Go to second step"
        size="big"
        style={{ marginTop: 32 }}
      >
        Continue
      </Button>
    </Form>
  );
};

export default FirstStep;
