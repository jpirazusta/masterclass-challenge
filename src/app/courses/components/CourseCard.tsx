import { Course } from "@/types/course";
import Image from "next/image";
import FavoriteIcon from "./FavoriteIcon";
import { useToggleFavorite } from "@/client/hooks/useToggleFavorite";
import { Spinner } from "@/components/common";

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
        className="text-left flex gap-3 cursor-pointer h-[120px] w-full overflow-hidden transition-colors rounded-lg bg-gray-400 hover:bg-gray-300 md:h-[158px]"
        disabled={isPending}
      >
        <Image
          src={instructor_image_url}
          width={168}
          height={158}
          className="my-3 ml-4 max-h-[158px] w-[120px] rounded-sm object-cover md:my-0 md:ml-0 md:w-[168px] md:rounded-none"
          alt="Instructor"
        />
        <div className="space-y-1 p-2 flex-1 text-black overflow-hidden">
          <div className="flex items-center gap-2">
            <h2
              className="font-semibold md:text-xl flex-1 truncate text-md"
              title={instructor_name}
            >
              {instructor_name}
            </h2>
            {isPending ? (
              <Spinner color="border-black" />
            ) : (
              <FavoriteIcon isFavorite={favorite} />
            )}
          </div>
          <h3>{title}</h3>
        </div>
      </button>
    </li>
  );
};

export default CourseCard;
