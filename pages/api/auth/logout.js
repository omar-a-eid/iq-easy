import { serialize } from "cookie";

export default async function login(req, res) {
  res.setHeader("Set-Cookie", [
    serialize("token", "", {
      maxAge: -1,
      path: "/",
    }),
  ]);
  res.end();
}
