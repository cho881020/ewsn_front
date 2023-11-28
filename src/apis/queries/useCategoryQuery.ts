import { useQuery } from "react-query";

import instance from "@/apis/client";

interface Category {
  id: number;
  name: string;
}

const useCategoryQuery = () => {
  const fetcher = async () => {
    const { data } = await instance.get("category");
    return data;
  };

  const { data } = useQuery<Category[]>(["category"], fetcher);

  return { categories: data };
};

export default useCategoryQuery;
