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
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <Input
            id="firstName"
            name="First name"
            label="First name"
            value={value}
            ref={ref}
            onChange={onChange}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
          />
        )}
      />

      <Controller
        control={control}
        name="firstStep.lastName"
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <Input
            id="lastName"
            name="Last name"
            label="Last name"
            value={value}
            ref={ref}
            onChange={onChange}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
          />
        )}
      />

      <Controller
        control={control}
        name="firstStep.birthday"
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <DateInput
            id="birthday"
            label="Birthday"
            name="birthday"
            value={value}
            onChange={onChange}
            ref={ref}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
          />
        )}
      />

      <Controller
        control={control}
        name="firstStep.phoneNumber"
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <Input
            id="phoneNumber"
            name="Phone number"
            label="Phone number"
            value={value}
            ref={ref}
            type="number"
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
          />
        )}
      />

      <Controller
        control={control}
        name="firstStep.policyNumber"
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <Input
            id="policyNumber"
            name="Policy number"
            label="Policy number"
            value={value}
            ref={ref}
            onChange={onChange}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
          />
        )}
      />

      <Controller
        control={control}
        name="firstStep.email"
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <Input
            id="email"
            name="Email"
            label="Email"
            value={value}
            ref={ref}
            onChange={onChange}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
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
