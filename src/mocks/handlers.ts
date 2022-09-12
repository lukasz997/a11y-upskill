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
    console.log("POST /form");
    await wait(1000);
    return res(ctx.status(200), ctx.json({ test: 123 }));
  }),
];
