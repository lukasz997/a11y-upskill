import React from "react";
import Layout from "./src/components/layout/layout";
import { getWorker } from "./src/mocks/browser";

getWorker().start({
  onUnhandledRequest: "bypass",
});

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};
