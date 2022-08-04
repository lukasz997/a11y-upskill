import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import { media } from "~/theme/media";
import { zindex } from "~/theme/zindex";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  label: string;
}

const StyledButton = styled.button<{ opened: boolean }>`
  border: none;
  background-color: transparent;
  width: 40px;
  z-index: ${zindex.skipLinks};

  ${media.M} {
    display: none;
  }

  > * {
    width: 100%;
    height: 4px;
    margin-top: 4px;
    background-color: #565d8f;
    transition: transform 0.3s ease, opacity 0.2s ease;
  }

  ${({ opened }) =>
    opened &&
    css`
      > :nth-child(1) {
        transform: rotate(45deg) translate(3px, 8px);
      }

      > :nth-child(2) {
        opacity: 0;
      }

      > :nth-child(3) {
        transform: rotate(-45deg) translate(4px, -8px);
      }
    `}
`;

const HamburgerButton: FunctionComponent<HamburgerButtonProps> = ({
  open,
  onClick,
  label,
}) => {
  return (
    <StyledButton
      opened={open}
      onClick={onClick}
      aria-expanded={open}
      aria-label={label}
      id="hamburger-menu-button"
    >
      <div aria-hidden="true"></div>
      <div aria-hidden="true"></div>
      <div aria-hidden="true"></div>
    </StyledButton>
  );
};

export default HamburgerButton;
