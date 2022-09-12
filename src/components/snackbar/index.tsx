import styled from "@emotion/styled";
import React, { FunctionComponent, useEffect, useRef } from "react";
import { getColor } from "~/theme/colors";
import { zindex } from "~/theme/zindex";

interface SnackbarProps {
  message: string;
  open: boolean;
  close: () => void;
}

const SnackbarContent = ({ close, message }: SnackbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <StyledSnackbar role="alert" ref={ref}>
      <p>{message}</p>
      <StyledButton onClick={close} aria-label="Close">
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </StyledButton>
    </StyledSnackbar>
  );
};

const Snackbar: FunctionComponent<SnackbarProps> = (props) => {
  if (!props.open) {
    return null;
  }

  return <SnackbarContent {...props} />;
};

const StyledSnackbar = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: white;
  border: 2px solid ${getColor("blue2")};
  padding: 12px;
  z-index: ${zindex.snackbar};

  max-width: calc(100vh - 16px);

  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled.button`
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  padding: 0;
  cursor: pointer;
  margin-left: 12px;
`;

export default Snackbar;
