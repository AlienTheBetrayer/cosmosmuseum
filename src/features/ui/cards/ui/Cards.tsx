"use client";

import { cardsFetch } from "@/features/ui/cards/fetch/cardsFetch";
import { cardsList } from "@/features/ui/cards/lib/cards";
import { Card } from "@/features/ui/cards/ui/Card";
import { useQuery } from "@tanstack/react-query";

export const Cards = () => {
  // fetching
  const fetched = useQuery({
    queryFn: cardsFetch,
    queryKey: ["reactions"],
  });

  const data = fetched.isPending
    ? undefined
    : fetched.data?.size
      ? fetched.data
      : null;

  // jsx
  return (
    <div className="flex flex-col gap-8 justify-center items-center gap-2 w-full max-w-6xl mx-auto h-full">
      <h2 className="text-3xl font-semibold" id="exhibits">
        Експонати
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-full gap-4 p-15">
        {cardsList.map((card, idx) => (
          <li key={card.src}>
            <Card
              src={card.src}
              qrText={card.qrText}
              idx={idx}
              data={data === undefined ? undefined : (data?.get(String(idx)) ?? null)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
