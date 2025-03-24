import { Course } from "@/types/course";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => (
  <li className="flex gap-3">
    <Image
      src={course.instructor_image_url}
      width={150}
      height={180}
      alt="Instructor"
    />
    <div>
      <h2>{course.instructor_name}</h2>
      <h3>{course.title}</h3>
    </div>
  </li>
);

export default CourseCard;
