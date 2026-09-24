import { Controller } from "@/backend/controller/core/Controller";
import { db } from "../../../../prisma/db";

export const GET = new Controller()
  .auth({ guard: false })
  .handle(async ({ body, user }) => {
    // getting the reactions
    const reactions = await db.Emojis.groupBy("exhibitId", "emoji").aggregate(
      (row) => ({ count: row.count() }),
    );

    // getting my reactions
    let mine: Set<string> = new Set();

    if (user) {
      const mineData = await db.Emojis.where({ userId: user.id }).all();
      mine = new Set(
        mineData.map((reaction) => `${reaction.exhibitId}-${reaction.emoji}`),
      );
    }

    // grouping them
    const withLiked = reactions.map((reaction) => ({
      ...reaction,
      liked: mine.has(`${reaction.exhibitId}-${reaction.emoji}`),
    }));

    const grouped = Object.groupBy(withLiked, (reaction) => reaction.exhibitId);

    return grouped;
  });
