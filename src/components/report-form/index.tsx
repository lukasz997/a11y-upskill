import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FunctionComponent, useState } from "react";
import { colors } from "~/theme/colors";
import { media } from "~/theme/media";
import Button from "../button/button";
import FirstStep from "./first-step";
import { useReportForm } from "./report-form.hooks";
import SecondStep from "./second-step";
import ThirdStep from "./third-step";

interface ReportFormProps {}

type FormStep = 1 | 2 | 3;

const ReportForm: FunctionComponent<ReportFormProps> = () => {
  const [step, setStep] = useState<FormStep>(1);
  const { control, trigger, getValues } = useReportForm();

  const triggerSubmitForm = () => {
    const data = getValues();
    fetch("/form", { method: "POST", body: JSON.stringify(data) });
  };

  return (
    <FormContainer>
      <FormNavigation>
        <NavigationButton isActive={step === 1} onClick={() => setStep(1)}>
          Step 1 - Personal Details
        </NavigationButton>
        <NavigationButton isActive={step === 2} onClick={() => setStep(2)}>
          Step 2 - Incident Details
        </NavigationButton>
        <NavigationButton isActive={step === 3} onClick={() => setStep(3)}>
          Step 3 - Expense Report
        </NavigationButton>
      </FormNavigation>

      <FormContent aria-live="polite" id="form-content">
        {step === 1 && (
          <FirstStep
            control={control}
            onContinue={async () => {
              const isValid = await trigger(["firstStep"]);

              if (isValid) {
                setStep(2);
              }
            }}
          />
        )}

        {step === 2 && (
          <SecondStep
            control={control}
            onContinue={async () => {
              const isValid = await trigger(["secondStep"]);

              if (isValid) {
                setStep(3);
              }
            }}
          />
        )}

        {step === 3 && (
          <ThirdStep
            control={control}
            onContinue={async () => {
              const isValid = await trigger();

              if (isValid) {
                triggerSubmitForm();
              }
            }}
          />
        )}
      </FormContent>
    </FormContainer>
  );
};

const FormContainer = styled.section`
  max-width: 800px;
  margin: auto;
  padding-top: 32px;
`;

const FormNavigation = styled.header`
  display: grid;
  grid-auto-flow: row;
  gap: 16px;
  ${media.M} {
    grid-auto-flow: column;
  }
`;

const NavigationButton = styled(Button)<{ isActive: boolean }>`
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${colors.blue2};
      color: ${colors.white1};
    `}
`;

NavigationButton.defaultProps = {
  variant: "outlined",
};

const FormContent = styled.div``;

export default ReportForm;
