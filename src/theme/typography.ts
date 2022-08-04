import { css } from "@emotion/react";
import { ThemeType } from ".";
import { media } from "./media";

export const typography = {
  h1: css`
    font-weight: 700;

    font-size: 3.2rem;

    ${media.M} {
      font-size: 4.2rem;
    }
    ${media.L} {
      font-size: 5.2rem;
    }
  `,

  h2: css`
    font-weight: 700;

    font-size: 2rem;
    line-height: 2.4rem;

    ${media.M} {
      font-size: 2.4rem;
      line-height: 3rem;
    }
    ${media.L} {
      font-size: 2.6rem;
      line-height: 3.2rem;
    }
  `,

  h3: css`
    font-weight: 700;

    font-size: 1.4rem;
    line-height: 1.8rem;

    ${media.M} {
      font-size: 1.8rem;
      line-height: 2.2rem;
    }
    ${media.L} {
      font-size: 2rem;
      line-height: 2.4rem;
    }
  `,

  p: css`
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4rem;

    ${media.L} {
      font-size: 1.2rem;
      line-height: 1.8rem;
    }
  `,
};

type TypographyKey = keyof typeof typography;

export const getTypography =
  (variant: TypographyKey) =>
  ({ theme }: { theme: ThemeType }) =>
    theme.typography[variant];
