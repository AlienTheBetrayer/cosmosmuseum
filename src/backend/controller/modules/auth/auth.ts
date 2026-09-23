import { contracts } from "@/backend";
import { modules } from "@/backend/controller";
import { AppError } from "@/backend/lib/error";
import bcrypt from "bcryptjs";
import { db } from "../../../../../prisma/db";

export class authService {
  /**
   * signs the user up, creates the user, generates their cosmetics, hashed password, etc
   * @param email email of the user
   * @param password password (not hashed)
   * @returns generated user if everything's right. throws if user already exists
   */
  static async signup(
    body: contracts.auth.Signup,
  ): Promise<contracts.auth.SignupResponse> {
    const user = await modules.userService.create(body);
    return user;
  }

  /**
   * verifies the login session
   * @param email email
   * @param password password
   * @returns
   */
  static async verify(
    body: contracts.auth.Verify,
  ): Promise<contracts.auth.VerifyResponse> {
    // validating the user
    const user = await modules.userService.find(body.identifier);

    if (!user?.passwordHash) {
      throw new AppError("Користувач не існує.", { field: "password" });
    }

    // password comparison
    const isCorrect = await bcrypt.compare(body.password, user.passwordHash);

    if (!isCorrect) {
      throw new AppError("Облікові дані недійсні.", { field: "password" });
    }

    return user;
  }

  /**
   * logins the user
   * @param email email of the user
   * @param password not hashed password
   * @returns
   */
  static async login(
    body: contracts.auth.Login,
  ): Promise<contracts.auth.LoginResponse> {
    // user verification
    const user = await this.verify(body);

    // issuing
    const { accessToken, refreshToken, session } =
      await modules.jwtService.issueAuthData({
        userId: user.id,
      });

    // setting
    await modules.jwtService.setHttpAuthTokens({ accessToken, refreshToken });

    return { accessToken, refreshToken, user, session };
  }

  /**
   * logs the user out
   * @returns true if succeded
   */
  static async logout(
    body: contracts.auth.Logout,
  ): Promise<contracts.auth.LogoutResponse> {
    const tokens = await modules.jwtService.getAuthTokens();

    // tokens found
    if (tokens.refreshToken) {
      try {
        const payload = modules.jwtService.verify({
          token: tokens.refreshToken,
          key: "REFRESH_TOKEN_SECRET",
        });

        // session + cookie clearing
        await Promise.all([
          db.AuthSessions.where({
            id: payload.sessionId,
          }).delete(),
          modules.jwtService.deleteCookie("accessToken"),
          modules.jwtService.deleteCookie("refreshToken"),
        ]);

        return true;
      } catch {
        throw new Error("Токен не валідний.");
      }
    }

    // not authenticated
    return false;
  }

  /**
   * creates the code for password recovery
   * @param email email of the user to send the code to
   * @param expiryMs expiry of the code in milliseconds
   * @returns
   */
  static async code(
    body: contracts.auth.Code,
  ): Promise<contracts.auth.CodeResponse> {
    await modules.verifyService.issueCode({
      email: body.email,
      expiryMs: 15 * 60 * 1000,
    });
    return true;
  }

  /**
   * recovers the password
   * @param email email of the user
   * @param password new password
   * @param code verification code
   * @returns true if succeded
   */
  static async forgotPassword(
    body: contracts.auth.ForgotPassword,
  ): Promise<contracts.auth.ForgotPasswordResponse> {
    // code validation
    const code = await modules.verifyService.validateCode({
      email: body.email,
      code: body.code,
    });

    // password generation
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(body.password, salt);

    // password changing
    await db.Users.where({ id: code.userId }).update({
      passwordHash: password,
    });

    return true;
  }
}
