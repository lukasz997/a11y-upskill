import { css } from "@emotion/react";
import { media } from "./media";

export const defaultSpacing = css`
  padding-left: 16px;
  padding-right: 16px;

  ${media.S} {
    padding-left: 24px;
    padding-right: 24px;
  }
`;
