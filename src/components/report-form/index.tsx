import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FunctionComponent, useState } from "react";
import { colors } from "~/theme/colors";
import { media } from "~/theme/media";
import Button from "../button/button";
import Snackbar from "../snackbar";
import FirstStep from "./first-step";
import { useReportForm } from "./report-form.hooks";
import SecondStep from "./second-step";
import ThirdStep from "./third-step";

interface ReportFormProps {}

type FormStep = 1 | 2 | 3;

const ReportForm: FunctionComponent<ReportFormProps> = () => {
  const [step, setStep] = useState<FormStep>(1);
  const [alert, setAlert] = useState<null | string>(null);
  const [submitState, setSubmitState] = useState<"pending" | "init" | "sent">(
    "init"
  );
  const {
    control,
    trigger,
    getValues,
    formState: { errors },
    reset,
  } = useReportForm();

  const triggerSubmitForm = async () => {
    const data = getValues();
    const res = await fetch("/form", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      setSubmitState("sent");
    }
  };

  return (
    <FormContainer>
      <FormNavigation>
        <NavigationButton
          isActive={step === 1}
          onClick={() => setStep(1)}
          disabled={step <= 1}
        >
          Step 1 - Personal Details
        </NavigationButton>
        <NavigationButton
          isActive={step === 2}
          onClick={() => setStep(2)}
          disabled={step <= 2}
        >
          Step 2 - Incident Details
        </NavigationButton>
        <NavigationButton
          isActive={step === 3}
          onClick={() => setStep(3)}
          disabled={step <= 3}
        >
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
            isPending={submitState === "pending"}
            isSent={submitState === "sent"}
            control={control}
            onContinue={async () => {
              const isValid = await trigger();

              if (!isValid) {
                console.log("invalid", errors);
                setAlert("Check previous forms");

                let message = "Please provide valid data in: ";

                if (errors?.firstStep) {
                  message += "Step 1 - Personal details ";
                }

                if (errors?.secondStep) {
                  message += "Step 2 - Incident details ";
                }

                if (errors?.thirdStep) {
                  message += "Step 3 - Expense report ";
                }

                setAlert(message);
              }

              if (isValid) {
                triggerSubmitForm();
                setSubmitState("sent");
              }
            }}
          />
        )}
      </FormContent>

      {submitState === "sent" && (
        <Snackbar
          close={() => {
            setSubmitState("init");
            setStep(1);
            reset({});
          }}
          message="Your form has been sent successfully. Press close to reset form values."
          open={true}
        />
      )}

      {alert && (
        <Snackbar message={alert} open={true} close={() => setAlert(null)} />
      )}
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
      background-color: ${colors.blue2}!important;
      color: ${colors.white1}!important;
    `}
`;

NavigationButton.defaultProps = {
  variant: "outlined",
};

const FormContent = styled.div``;

export default ReportForm;
