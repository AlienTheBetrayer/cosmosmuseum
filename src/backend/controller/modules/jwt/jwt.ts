import jwt from "jsonwebtoken";
import z from "zod";

export class jwtService {
  /**
   * default schema for token payload
   */
  static readonly defaultSchema = z.object({
    sessionId: z.string(),
    userId: z.string(),
  });

  /**
   * parses, verifies and validates the token and returns its payload
   * @param token token string
   * @param key key in the process.env
   * @param schema (optional) custom schema to parse the token with
   * @returns 
   */
  static verify<T extends z.ZodObject = typeof this.defaultSchema>(
    token: string,
    key: string,
    schema?: T,
  ) {
    // key
    const processKey = process.env[key];

    if (!processKey) {
      throw new Error("process key is not found.");
    }

    // verifying
    const payload = jwt.verify(token, processKey);

    const verified = (schema ?? this.defaultSchema).safeParse(payload);
    if (!verified.success) {
      throw new Error(
        `failed validating token with a given schema. reason: ${verified.error.message}`,
      );
    }

    return verified.data;
  }
}
