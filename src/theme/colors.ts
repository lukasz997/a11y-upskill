import { ThemeType } from "./index";

export const colors = {
  white1: "white",
  blue1: "#9ea6e2",
  blue2: "#565d8f",
  pink0: "#ffebf2",
  pink1: "#fed6e3",
  pink2: "#ffc0cb",
  pink3: "#fba1bf",
  grey1: "#dbdbdb",
};

type ColorKey = keyof typeof colors;

export const getColor =
  (color: ColorKey) =>
  ({ theme }: { theme: ThemeType }) =>
    theme.colors[color];
