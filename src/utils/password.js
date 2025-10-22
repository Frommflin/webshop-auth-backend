import bcrypt from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

export async function hashPassword(plainpassword) {
  return bcrypt.hash(plainpassword, SALT_ROUNDS);
}

export async function comparePassword(plainpassword, hash) {
  return bcrypt.compare(plainpassword, hash);
}
