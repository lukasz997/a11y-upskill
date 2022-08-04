import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const getWorker = () => setupWorker(...handlers);
