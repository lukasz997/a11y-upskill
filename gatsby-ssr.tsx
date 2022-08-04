import React from "react";
import { RenderBodyArgs, WrapPageElementNodeArgs } from "gatsby";
import Layout from "./src/components/layout/layout";

export const wrapPageElement = ({ element }: WrapPageElementNodeArgs) => {
  return <Layout>{element}</Layout>;
};

export const onRenderBody = ({ setHtmlAttributes }: RenderBodyArgs) => {
  setHtmlAttributes({ lang: "en" });
};
