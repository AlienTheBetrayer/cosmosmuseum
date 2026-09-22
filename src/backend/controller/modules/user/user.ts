import { random } from "@/backend/lib/random";
import { Avatar, Style } from "@dicebear/core";
import definition from "@dicebear/styles/identicon.json";
import { db } from "../../../../../prisma/db";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import { contracts } from "@/backend";
import { AppError } from "@/backend/error/error";
import { or } from "@prisma/orm-postgres/orm-client";

export class userService {
  /**
   * generates a new user along with random color and identicon
   * @param email email of the user
   * @param password raw password (not hashed)
   * @returns created user object
   */
  static async create(
    body: contracts.user.Create,
  ): Promise<contracts.user.CreateResponse> {
    // validation
    const found = await db.Users.first({
      email: body.email,
    });

    if (found) {
      throw new AppError("Користувач із такою електронною адресою вже існує.", {
        field: "email",
      });
    }

    const username = await db.Users.first({
      username: body.username,
    });

    if (username) {
      throw new AppError("Користувач із таким іменем уже існує.", {
        field: "username",
      });
    }

    // random cosmetics
    const color = random.hex();
    const style = new Style(definition);
    const avatar = new Avatar(style, {
      seed: body.email,
      rowColor: color,
    });

    // hashing
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(body.password, salt);

    // creation
    const user = await db.Users.create({
      id: body.id ?? nanoid(),
      passwordHash,
      username: body.username,
      email: body.email,
      avatarUrl: avatar.toDataUri(),
      color,
      lastSeenAt: Temporal.Now.instant(),
    });

    return user;
  }

  /**
   * finds a user by a selected param (choose only one)
   * @param email email to find by
   * @param username username to find by
   * @returns found user
   */
  static async find(
    body: contracts.user.Find,
  ): Promise<contracts.user.FindResponse> {
    // user
    const user = await db.Users.where((u) =>
      or(u.email.eq(body), u.username.eq(body)),
    ).first();

    return user;
  }
}
