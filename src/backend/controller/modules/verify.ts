import { random } from "@/backend/lib/random";
import { nanoid } from "nanoid";
import { db } from "../../../../prisma/db";
import { modules } from "@/backend/controller";
import { AppError } from "@/backend/lib/error";

export class verifyService {
  static async issueCode(body: { email: string; expiryMs: number }) {
    // finding the user
    const user = await db.Users.where({ email: body.email }).first();

    if (!user) {
      throw new Error("Користувача не знайдено");
    }

    // creating the code
    const verificationCode = await db.Codes.create({
      id: nanoid(),
      code: random.string(6, "0123456789"),
      userId: user.id,
      expiryAt: Temporal.Instant.fromEpochMilliseconds(
        Date.now() + body.expiryMs,
      ),
    });

    if (!verificationCode.code) {
      throw new AppError("Не вдалося створити код.", { field: "code" });
    }

    // send it via email
    await modules.mailService.send({
      to: body.email,
      html: modules.mailService.generateVerificationEmail(
        verificationCode.code,
      ),
      subject: `Verification code`,
    });

    return verificationCode;
  }

  static async validateCode(body: { email: string; code: string }) {
    // finding the user
    const user = await db.Users.where({ email: body.email }).first();

    if (!user) {
      throw new Error("Користувача не знайдено");
    }

    const status = await db.Codes.where({ userId: user.id, code: body.code })
      .where((p) => p.expiryAt.gte(Temporal.Now.instant()))
      .first();

    // verification
    if (!status) {
      throw new AppError("Код перевірки недійсний.", { field: "code" });
    }

    // auto-cleanup
    await db.Codes.where({ userId: user.id, code: body.code }).delete();

    return status;
  }
}
