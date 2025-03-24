import { useInfiniteQuery } from "@tanstack/react-query";

import { axiosClient } from "@/client";
import { Course } from "@/types/course";

const USER_EMAIL = process.env.NEXT_PUBLIC_USER_EMAIL;

const PAGE_LIMIT = 5;

interface CoursesResponse {
  data: Course[];
}

// TODO: Fix types
export const useGetCourses = () =>
  useInfiniteQuery<CoursesResponse, Error>({
    queryKey: ["courses", USER_EMAIL],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await axiosClient.get<CoursesResponse>(
        `/courses?email=${USER_EMAIL}&page[limit]=${PAGE_LIMIT}&page[offset]=${pageParam}`
      );
      return { data };
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length < PAGE_LIMIT
        ? null
        : allPages.length * PAGE_LIMIT;
    },
  });
