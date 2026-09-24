"use client";

import { contracts } from "@/backend";
import { api } from "@/shared/lib/api";
import { queryClient } from "@/shared/ui/providers/QueryProvider";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

export const useAddReactionMutation = () => {
  const add = useMutation({
    mutationFn: async (data: contracts.reactions.Add) => {
      const res = api.post("/api/reactions/add", data);
      return (await res).data;
    },
    onMutate: (data) => {
      const previous = queryClient.getQueryData(["reactions"]);

      queryClient.setQueryData(
        ["reactions"],
        (old: Map<string, contracts.reactions.GetResponseItem[]>) => {
          const next = new Map(old ?? []);

          // finding the reaction
          let reactions = next.get(String(data.exhibit_id)) ?? [];

          const found = reactions.find(
            (reaction) => reaction.emoji === data.emoji,
          );

          if (!found) {
            reactions = [
              ...reactions,
              {
                emoji: data.emoji,
                count: 1,
                liked: true,
                exhibitId: data.exhibit_id,
              },
            ];
          } else if (found.liked) {
            // removing the reaction
            reactions =
              found.count === 1
                ? reactions.filter((reaction) => reaction.emoji !== data.emoji)
                : reactions.map((reaction) =>
                    reaction.emoji === data.emoji
                      ? {
                          ...reaction,
                          count: reaction.count - 1,
                          liked: false,
                        }
                      : reaction,
                  );
          } else {
            // adding the reaction
            reactions = reactions.map((reaction) =>
              reaction.emoji === data.emoji
                ? {
                    ...reaction,
                    count: reaction.count + 1,
                    liked: true,
                  }
                : reaction,
            );
          }

          next.set(data.exhibit_id, reactions);

          return next;
        },
      );

      return { previous };
    },
  });

  return useMemo(() => ({ add }), [add]);
};
