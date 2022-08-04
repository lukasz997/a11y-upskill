import { RefObject, useEffect } from "react";

type FocusTrapSettings = {
  ref: RefObject<HTMLElement>;
  active: boolean;
};

const InteractiveSelector = "button, a";

export const useFocusTrap = (active: boolean, { ref }: FocusTrapSettings) => {
  ref?.current?.querySelectorAll(InteractiveSelector);

  useEffect(() => {
    if (active) {
      console.log("Active");
    }
  }, []);
};
