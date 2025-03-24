import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "@/client";
import { Course } from "@/types/course";

const USER_EMAIL = process.env.NEXT_PUBLIC_USER_EMAIL;

export const useGetCourses = () =>
  useQuery<Course[], Error>({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/courses?email=${USER_EMAIL}`);
      return data;
    },
  });
