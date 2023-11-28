import { useQuery } from "react-query";

import instance from "@/apis/client";

const usePoliticalOrientationsQuery = () => {
  const fetcher = async () => {
    const { data } = await instance.get("politicalOrientation");
    return data;
  };

  const { data } = useQuery(["politicalOrientation"], fetcher);

  return { politicalOrientations: data };
};

export default usePoliticalOrientationsQuery;
