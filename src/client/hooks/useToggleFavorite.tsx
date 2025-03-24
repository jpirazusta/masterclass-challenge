import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axiosClient } from "@/client";

const USER_EMAIL = process.env.NEXT_PUBLIC_USER_EMAIL;

const addToFavorites = async ({ courseId }: { courseId: number }) => {
  try {
    const res = await axiosClient.post("/favorite", {
      email: USER_EMAIL,
      course_id: courseId,
    });
    return res.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

const removeFromFavorites = async ({ courseId }: { courseId: number }) => {
  try {
    const res = await axiosClient.delete("/favorite", {
      data: {
        email: USER_EMAIL,
        course_id: courseId,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const useToggleFavorite = ({ isFavorite }: { isFavorite: boolean }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId }: { courseId: number }) =>
      isFavorite
        ? removeFromFavorites({ courseId })
        : addToFavorites({ courseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", USER_EMAIL] });
      toast.success(
        `Course ${
          isFavorite
            ? "is not a favorite anymore"
            : "has been marked as favorite"
        }`
      );
    },
  });
};
