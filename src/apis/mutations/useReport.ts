import { useMutation, useQueryClient } from "react-query";
import { isAxiosError } from "axios";

import api from "@/apis/client";

interface ReportParams {
  postingId?: number;
  replyId?: number;
  reason: string;
  onSuccess: () => void;
}

const useReport = (params: ReportParams) => {
  const queryClient = useQueryClient();

  const fetcher = async () => {
    await api.post("report", params);
  };

  const queries = [params.postingId && `${params.postingId}`, "postings"];

  const { mutate } = useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(queries);
      params.onSuccess();
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        console.log(err.response?.data.message);
      }
    },
  });

  return { mutate };
};

export default useReport;
