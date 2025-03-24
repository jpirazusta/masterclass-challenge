import { Course } from "@/types/course";
import Image from "next/image";
import FavoriteIcon from "./FavoriteIcon";
import { useToggleFavorite } from "@/client/hooks/useToggleFavorite";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({
  course: { instructor_image_url, instructor_name, title, favorite, id },
}: CourseCardProps) => {
  const { mutate, isPending } = useToggleFavorite({ isFavorite: favorite });

  const handleFavoriteClick = () => {
    mutate({ courseId: id });
  };

  return (
    <li>
      <button
        onClick={handleFavoriteClick}
        aria-label="Toggle favorite"
        className="text-left flex gap-3 w-full cursor-pointer w-full"
        disabled={isPending}
      >
        <Image
          src={instructor_image_url}
          width={150}
          height={180}
          alt="Instructor"
        />
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-2">
            <h2 className="flex-1 truncate">{instructor_name}</h2>
            <FavoriteIcon isFavorite={favorite} />
          </div>
          <h3>{title}</h3>
        </div>
      </button>
    </li>
  );
};

export default CourseCard;
