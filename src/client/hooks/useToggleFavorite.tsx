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
    const res = await fetch(
      "https://pr-42389.masterclass.dev/jsonapi/v1/favorite",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "",
        },
        body: JSON.stringify({
          email: USER_EMAIL,
          course_id: courseId,
        }),
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to remove from favorites");
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
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
