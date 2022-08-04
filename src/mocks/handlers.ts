import { rest } from "msw";

const wait = (ms: number) =>
  new Promise((res) => {
    setTimeout(() => {
      res("");
    }, ms);
  });

export const handlers = [
  // Handles a POST /login request
  rest.post("/form", async (req, res, ctx) => {
    await wait(1000);
    res(ctx.status(200), ctx.json({ test: 123 }));
  }),
];
