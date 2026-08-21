import bcrypt from "bcryptjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function hashing(value: string) {
  if (!value) return null;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(value, salt);
  return hashed;
}

export async function comparePass(password: string, hashedPassword: string) {
  if (!password || !hashedPassword) return null;
  const isSame = await bcrypt.compare(password, hashedPassword);
  return isSame;
}
