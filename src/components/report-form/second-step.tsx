import React, { FunctionComponent } from "react";
import { Controller } from "react-hook-form";
import Button from "../button/button";
import Input from "../input";
import DateInput from "../input/date-input";
import RadioGroup from "../radio-group";
import { FormProps } from "./report-form.hooks";
import { Form } from "./styled";
import { TravelPurposeType } from "./types";

interface SecondStepProps extends FormProps {}

const radioOptions: { value: TravelPurposeType; label: string }[] = [
  { value: "high-risk sport", label: "Hight risk sport" },
  { value: "physical work", label: "Physical work" },
  { value: "study / mental work", label: "Study / mental work" },
  { value: "tourism", label: "Tourism" },
];

const SecondStep: FunctionComponent<SecondStepProps> = ({
  onContinue,
  control,
}) => {
  const onInternalSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onContinue();
  };

  return (
    <Form onSubmit={onInternalSubmit}>
      <h2>Incident details</h2>
      <Controller
        control={control}
        name="secondStep.purposeOfTravel"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <RadioGroup
              options={radioOptions}
              value={value}
              onChange={onChange}
              fieldLabel="Purpose of travel"
            />
            {error?.message && (
              <p style={{ textAlign: "left", color: "red" }}>
                {error?.message}
              </p>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="secondStep.country"
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <Input
            id="country"
            name="Country"
            label="Country"
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
        name="secondStep.address"
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <Input
            id="address"
            name="Address"
            label="Address"
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
        name="secondStep.date"
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <DateInput
            id="date"
            label="Date"
            name="Date"
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
        name="secondStep.incidentDescription"
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <Input
            id="incidentDescription"
            name="Incident description"
            label="Incident description"
            value={value}
            ref={ref}
            onChange={onChange}
            errorMessage={
              error && { message: error.message ?? "", errorName: error.type }
            }
            isTextArea={true}
          />
        )}
      />

      <Button
        style={{ marginTop: 32 }}
        type="submit"
        aria-label="Go to third step"
        size="big"
      >
        Continue
      </Button>
    </Form>
  );
};

export default SecondStep;
