import styled from "@emotion/styled";
import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { zindex } from "~/theme/zindex";

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #06060669;
  display: flex;
  z-index: ${zindex.modal};
`;

const ModalContentOuterWrapper = styled.div`
  flex: 1 1 100%;
  height: 100%;
  display: flex;
  position: relative;
`;

type ModalProps = PropsWithChildren<{
  open: boolean;
  closeModal: () => void;
}>;

const getGatsbyRoot = () => document.querySelector("#___gatsby");

const addScroll = () => {
  document.body.style.overflowY = "auto";
  getGatsbyRoot()?.setAttribute("aria-hidden", "false");
};

const removeScroll = () => {
  document.body.style.overflowY = "hidden";
  getGatsbyRoot()?.setAttribute("aria-hidden", "true");
};

const Modal: FunctionComponent<ModalProps> = ({
  children,
  open,
  closeModal,
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let escKeyListener = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        closeModal();
        return;
      }

      if (ev.key === "Tab") {
        const focusableElements =
          backdropRef.current?.querySelectorAll(focusableSelector);

        const isShiftActive = ev.shiftKey;
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];

        if (isShiftActive && document.activeElement === firstElement) {
          ev.preventDefault();
          (lastElement as HTMLButtonElement)?.focus();
        }

        if (document.activeElement === lastElement && !isShiftActive) {
          ev.preventDefault();
          (firstElement as HTMLButtonElement)?.focus();
        }
      }
    };

    if (open) {
      removeScroll();
      document.addEventListener("keydown", escKeyListener);

      (
        backdropRef.current?.querySelector(
          focusableSelector
        ) as HTMLButtonElement
      )?.focus();
    }

    if (!open) {
      addScroll();
      document.removeEventListener("keydown", escKeyListener);
    }

    return () => {
      addScroll();
      document.removeEventListener("keydown", escKeyListener);
    };
  }, [open, closeModal]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <ModalBackdrop ref={backdropRef}>
      <ModalContentOuterWrapper>{children}</ModalContentOuterWrapper>
    </ModalBackdrop>,
    document?.querySelector("modal-container") ?? document.body
  );
};

export default Modal;
