import { NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(req) {
  const secret = new TextEncoder().encode(
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
  );
  const url = req.nextUrl.clone();
  if (req.cookies) {
    if (
      req.nextUrl.pathname.includes("/login") ||
      req.nextUrl.pathname.includes("/signup")
    ) {
      try {
        const { cookies } = req;
        const jwt = cookies.get("token").value;
        const { payload } = await jose.jwtVerify(jwt, secret);
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      } catch (err) {
        return;
      }
    }
  }
  if (req.nextUrl.pathname.includes("/admin")) {
    try {
      const { cookies } = req;
      const jwt = cookies.get("token").value;
      const { payload } = await jose.jwtVerify(jwt, secret);
      if (payload.iss !== "admin") {
        throw new Error();
      }
    } catch (err) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  if (
    req.nextUrl.pathname.includes("/dashboard")
    //  ||
    // req.nextUrl.pathname.includes("/courses")
  ) {
    try {
      const { cookies } = req;
      const jwt = cookies.get("token").value;
      await jose.jwtVerify(jwt, secret);

      NextResponse.next();
    } catch (err) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // if (req.nextUrl.pathname.includes("/courses")) {
  //   const { cookies } = req;
  //   const jwt = cookies.get("token").value;
  //   const { payload } = await jose.jwtVerify(jwt, secret);
  //   if (new Date(payload.sub).getTime() === new Date().getTime()) {
  //     url.pathname = "/dashboard";
  //     return NextResponse.next(url);
  //   }
  //   return NextResponse.next();
  // }
  return NextResponse.next();
}
