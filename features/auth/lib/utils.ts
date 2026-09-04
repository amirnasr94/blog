import bcrypt from "bcryptjs";

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
