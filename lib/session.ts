import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

type Payload = {
  userEmail: string;
  expireDate: Date;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encript(payload: Payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decript(session: string | undefined = "") {
  if (!session) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed To Verify Session!", error);
  }
}

export async function createSession(userEmail: string) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await encript({
    userEmail,
    expireDate: expires,
  });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decript(session);
  if (!session || !payload) {
    return null;
  }
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookie = await cookies();
  cookie.delete("session");
}

export async function verifySession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decript(session);

  if (!payload?.userEmail) {
    return { isAuth: false, userEmail: null };
  }

  return { isAuth: true, userEmail: payload?.userEmail };
}
