import { Controller } from "@/backend/controller/core/Controller";
import { Db, db } from "../../../../../prisma/db";
import { contracts } from "@/backend";
import { nanoid } from "nanoid";

export const POST = new Controller()
  .validateBody(contracts.reactions.add)
  .auth()
  .handle(async ({ body, user }) => {
    // getting reaction
    const reaction = await db.Emojis.where({
      userId: user!.id,
      exhibitId: String(body.exhibit_id),
      emoji: body.emoji,
    }).first();

    // changing the reaction
    let reacted: Db["Emojis"] | null;

    if (reaction) {
      reacted = await db.Emojis.where({
        userId: user!.id,
        exhibitId: String(body.exhibit_id),
        emoji: body.emoji,
      }).delete();
    } else {
      reacted = await db.Emojis.create({
        id: body.id ?? nanoid(),
        exhibitId: String(body.exhibit_id),
        userId: user!.id,
        emoji: body.emoji,
      });
    }

    return { reacted };
  });
