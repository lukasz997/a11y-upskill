import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { memo } from "react";
import { getColor } from "~/theme/colors";
import { zindex } from "~/theme/zindex";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: "medium" | "big";
  variant?: "outlined" | "contained";
}

const ButtonBase = styled.button<ButtonProps>`
  border: none;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  padding: 10px 20px;
  font-size: 1rem;

  ${({ size }) =>
    size === "big" &&
    css`
      font-size: 1.6rem;
      padding: 16px 32px;
    `}
`;

const ButtonContained = styled(ButtonBase)`
  color: white;
  background-color: transparent;
  position: relative;
  z-index: ${zindex.content};
  overflow: hidden;
  background-color: #565d8f;
  transition: color 0.3s ease, box-shadow 0.3s ease;

  :hover {
    box-shadow: ${(props) =>
      props.size === "big"
        ? `10px -8px ${getColor("pink1")(props)}`
        : `5px -4px ${getColor("pink1")(props)}`};
    color: ${getColor("pink1")};
  }

  :active,
  :focus {
    box-shadow: ${(props) =>
      props.size === "big"
        ? `10px -8px ${getColor("pink3")(props)}`
        : `5px -4px ${getColor("pink3")(props)}`};
    color: ${getColor("pink3")};
  }

  &:disabled {
    background-color: ${getColor("grey1")};
    color: white;
    box-shadow: none;
  }
`;

const ButtonOutlined = styled(ButtonBase)`
  color: ${getColor("blue2")};
  border: 2px solid ${getColor("blue2")};
  background-color: transparent;

  padding: 8px 18px;

  ${({ size }) =>
    size === "big" &&
    css`
      padding: 14px 30px;
    `}

  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  :hover {
    background-color: ${getColor("pink1")};
    box-shadow: 0px 0px 14px 5px ${getColor("pink1")};
  }

  :focus,
  :active {
    background-color: ${getColor("pink2")};
  }

  :disabled {
    border: 2px solid ${getColor("grey1")};
    color: ${getColor("grey1")};
    cursor: initial;
    background-color: transparent;
    box-shadow: none;
  }
`;

const Button = memo(function ButtonMemo(props: ButtonProps) {
  const { variant = "contained" } = props;
  if (variant === "contained") {
    return <ButtonContained {...props} />;
  }

  return <ButtonOutlined {...props} />;
});

export default Button;
