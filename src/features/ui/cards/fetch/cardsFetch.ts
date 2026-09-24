import { contracts } from "@/backend";
import { api } from "@/shared/lib/api";

export const cardsFetch = async () => {
  const res = (await api.get("/api/reactions")).data as {
    data: contracts.reactions.GetResponse;
  };
  const data = res.data;
  const grouped = new Map(Object.entries(data));

  return grouped;
};
