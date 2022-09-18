import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import React from "react";
import LogoTest from "../../assets/cloud_icon.svg";

interface LinkProps {
  styles?: SerializedStyles;
}
const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "styles",
})<LinkProps>`
  height: 90px;
  width: 240px;
  display: flex;
  align-items: stretch;
  ${({ styles }) => styles}
`;

function Logo({ styles }: LinkProps) {
  return (
    <StyledLink to="/" styles={styles} title="The Insurer company homepage">
      <LogoTest style={{ height: "auto", width: "100%" }} />
    </StyledLink>
  );
}

export default Logo;
