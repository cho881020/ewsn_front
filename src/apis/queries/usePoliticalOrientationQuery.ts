import { useQuery } from "react-query";

import instance from "@/apis/client";

const usePoliticalOrientationQuery = ({ id }: { id: number }) => {
  const fetcher = async () => {
    const { data } = await instance.get(`politicalOrientation/${id}`);
    return data;
  };

  const { data } = useQuery<{ id: number; name: string }>(
    ["politicalOrientation", id],
    fetcher
  );

  return { politicalOrientation: data };
};

export default usePoliticalOrientationQuery;
