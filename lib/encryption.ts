import crypto from "crypto"

const ALGORITHM = "aes-256-gcm"
const SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY || crypto.randomBytes(32).toString("hex")

if (!process.env.ENCRYPTION_SECRET_KEY) {
  console.warn("ENCRYPTION_SECRET_KEY not set. Using random key - data will not persist across restarts.")
}

export interface EncryptedData {
  encryptedData: string
  iv: string
  authTag: string
}

export function encrypt(text: string): EncryptedData {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipher(ALGORITHM, Buffer.from(SECRET_KEY, "hex"))

  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")

  const authTag = cipher.getAuthTag()

  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
  }
}

export function decrypt(encryptedData: EncryptedData): string {
  const decipher = crypto.createDecipher(ALGORITHM, Buffer.from(SECRET_KEY, "hex"))
  decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"))

  let decrypted = decipher.update(encryptedData.encryptedData, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}

export function hashApiKey(apiKey: string): string {
  return crypto.createHash("sha256").update(apiKey).digest("hex")
}
