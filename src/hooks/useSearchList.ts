import { useSuspenseQuery } from "@tanstack/react-query";
import { getSearchList } from "@api/getSearchList";
import { Nullable } from "@/types/nullable";
import { AxiosRequestConfig } from "axios";

export const useSearchList = (
  accomodationName: Nullable<string>,
  selectedDistrict: Nullable<string>,
  startDate: Nullable<string>,
  endDate: Nullable<string>,
  category: Nullable<string>,
  pageNum: number,
  pageSize: number,
  isRefetched: Nullable<boolean>,
  headers?: AxiosRequestConfig['headers']
) => {
  return useSuspenseQuery({
    queryKey: ["searchList", pageNum, pageSize, headers, isRefetched],
    queryFn: () =>
      getSearchList(
        accomodationName,
        selectedDistrict,
        startDate,
        endDate,
        category,
        pageNum,
        pageSize,
        headers
      )
  });
};
