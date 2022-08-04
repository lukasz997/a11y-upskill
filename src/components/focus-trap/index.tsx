import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";

type FocusTrapProps = PropsWithChildren<{
  active: boolean;
}>;

const FocusTrap: FunctionComponent<FocusTrapProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(children?.valueOf());
    console.log(
      "DID MOUNT",
      containerRef.current?.querySelectorAll("a, button")
    );
  }, []);

  return <>{children}</>;
};

export default FocusTrap;
