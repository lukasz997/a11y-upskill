import {} from "@reach/router";
import React from "react";
import { ReactNode } from "react";

declare module "@reach/router" {
  export interface ServerLocationProps {
    url: string;
    children: ReactNode;
  }

  export class ServerLocation extends React.Component<ServerLocationProps> {}
}
