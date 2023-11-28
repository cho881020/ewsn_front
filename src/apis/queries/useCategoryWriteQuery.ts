import { useQuery } from "react-query";

import instance from "@/apis/client";

interface Category {
  id: number;
  name: string;
}

const useCategoryWriteQuery = () => {
  const fetcher = async () => {
    const { data } = await instance.get("category/write");
    return data;
  };

  const { data } = useQuery<Category[]>(["category/write"], fetcher);

  return { categories: data };
};

export default useCategoryWriteQuery;
