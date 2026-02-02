import crypto from "crypto";

const ADMIN_SECRET = process.env.ADMIN_SECRET!;

/* ===== CREATE TOKEN ===== */
export function createAdminToken() {
  const payload = {
    role: "admin",
    iat: Date.now(),
  };

  const data = JSON.stringify(payload);

  const signature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(data)
    .digest("hex");

  return Buffer.from(data).toString("base64") + "." + signature;
}

/* ===== VERIFY TOKEN ===== */
export function verifyAdminToken(token: string) {
  try {
    const [encoded, signature] = token.split(".");
    const data = Buffer.from(encoded, "base64").toString();

    const expectedSignature = crypto
      .createHmac("sha256", ADMIN_SECRET)
      .update(data)
      .digest("hex");

    if (signature !== expectedSignature) return false;

    const payload = JSON.parse(data);
    return payload.role === "admin";
  } catch {
    return false;
  }
}
