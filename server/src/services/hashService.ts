import crypto from "crypto";
import config from "../config/config.js";


/**
 * Applys a SHA256 hash to a string using a secret from config.
 * 
 * @param token - String to hash
 * @returns Hashed string
 */
export function sha256(token: string): string {

// Simpler hash function, use other function if passwords are hashed in the future
const hashedToken = crypto
  .createHmac("sha256", config.sha256Secret)
  .update(token)
  .digest("hex");

  return hashedToken;
}