import { NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/library "];

export default function middleware(req) {
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies;

    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}
