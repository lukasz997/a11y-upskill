import { Control, useForm } from "react-hook-form";
import { AllFormsValidator, FormsCollection } from "./types";

export const useReportForm = () => {
  const { control, handleSubmit, watch, trigger, formState, getValues } =
    useForm<FormsCollection>({
      defaultValues: {
        firstStep: { firstName: "", lastName: "", birthday: undefined },
      },
      reValidateMode: "onBlur",
      resolver: AllFormsValidator,
    });

  return { control, handleSubmit, watch, trigger, formState, getValues };
};

export type FormProps = {
  control: Control<FormsCollection, any>;
  onContinue: () => void;
};
