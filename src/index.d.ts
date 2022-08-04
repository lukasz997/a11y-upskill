declare module "*.svg" {
  import type { FunctionComponent, ReactSVGElement, SVGProps } from "react";

  const content: FunctionComponent<SVGProps<SVGSVGElement>>;

  export default content;
}
