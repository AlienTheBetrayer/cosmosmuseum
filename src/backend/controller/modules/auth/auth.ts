import { contracts } from "@/backend";
import { modules } from "@/backend/controller";
import { AppError } from "@/backend/error/error";
import bcrypt from "bcryptjs";

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
}
