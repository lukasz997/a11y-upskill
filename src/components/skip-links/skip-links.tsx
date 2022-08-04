import styled from "@emotion/styled";
import React, { FunctionComponent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type SkipLinkItem = { label: string; href: string };

interface SkipLinksProps {
  content: SkipLinkItem[];
}

const LinkRenderer = styled.a`
  display: inline;
  left: -9000em;
  padding: 7px 10px;
  position: absolute;
  text-align: center;
  text-decoration: none;
  width: 150px;
  z-index: 30000000;

  :hover,
  :focus,
  :active {
    background: #231f20;
    color: #fff;
    left: 0px;
    position: absolute;
    top: 0px;
  }
`;

const SkipLinks: FunctionComponent<SkipLinksProps> = ({ content }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      {content.map(({ href, label }) => (
        <li key={href + label}>
          <LinkRenderer href={href}>{label}</LinkRenderer>
        </li>
      ))}
    </>,
    document?.body.querySelector("#skip-links") ?? document.body
  );
};

export default SkipLinks;
