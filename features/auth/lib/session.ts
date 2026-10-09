import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cache } from "react";
import { cookies } from "next/headers";

const SESSION_COOKIE = "session";
const SESSION_DAYS = 7;
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;

const secret = process.env.SESSION_SECRET;
if (!secret) {
  throw new Error("SESSION_SECRET is not set");
}
const encodedKey = new TextEncoder().encode(secret);

async function encrypt(userId: string) {
  return new SignJWT({})
    .setSubject(userId)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(encodedKey);
}

async function decrypt(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

async function setSessionCookie(token: string, expires: Date) {
  console.log("token", token);

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function createSession(userId: string) {
  const token = await encrypt(userId);
  await setSessionCookie(token, new Date(Date.now() + SESSION_MS));
}

export async function refreshSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const payload = await decrypt(token);
  if (!payload?.sub) return null;

  const newToken = await encrypt(payload.sub);
  await setSessionCookie(newToken, new Date(Date.now() + SESSION_MS));
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export const verifySession = cache(async () => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const payload = await decrypt(token);

  if (!payload?.sub) {
    return { isAuth: false as const, userId: null };
  }
  return { isAuth: true as const, userId: payload.sub };
});
