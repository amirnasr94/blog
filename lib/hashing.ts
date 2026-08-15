import bcrypt from "bcryptjs";

export async function hashing(value: string) {
  if (!value) return null;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(value, salt);
  return hashed;
}
