import { useQuery } from "@tanstack/react-query";
import { getSearchList } from "@api/getSearchList";

export const useSearchList = (
  accomodationName: string | null,
  selectedDistrict: string | null,
  startDate: string | null,
  endDate: string | null,
  category: string | null
) => {
  return useQuery({
    queryKey: ["searchList"],
    queryFn: () => getSearchList(accomodationName, selectedDistrict, startDate, endDate, category),
  });
};