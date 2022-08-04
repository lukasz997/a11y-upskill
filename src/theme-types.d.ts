import "@emotion/react";
import { ThemeType } from "./theme/index";

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}
