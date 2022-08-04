import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { useCallback } from "react";
import { z } from "zod";
import Input, { InputProps } from ".";

const dateFormat = "yyyy-MM-dd";
const dateValidator = z.date();

type DateInputProps = Omit<InputProps, "type" | "onChange" | "value"> & {
  onChange: (date: Date | null) => void;
  value: Date | null;
};

const DateInput: FunctionComponent<DateInputProps> = ({
  onChange,
  value,
  ...inputProps
}) => {
  const onValueChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const nextValue = event.target.valueAsDate;

      if (nextValue === null) {
        onChange(nextValue);
        return;
      }

      const validation = dateValidator.safeParse(nextValue);

      if (validation.success) {
        onChange(validation.data);
      }
    },
    [onChange]
  );

  return (
    <Input
      {...inputProps}
      value={value ? format(value, dateFormat) : undefined}
      onChange={onValueChange}
      type="date"
      required
    />
  );
};

export default DateInput;
