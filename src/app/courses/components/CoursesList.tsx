"use client";

import classNames from "classnames";
import { useState } from "react";

import CourseCard from "@/app/courses/components/CourseCard";
import { Course } from "@/types/course";

const getButtonClasses = (active: boolean) =>
  classNames(
    "font-semibold text-gray-400 bg-gray-900 rounded-sm px-4 py-1 cursor-pointer",
    {
      "text-white bg-gray-950 border border-yellow-200": active,
    }
  );

interface CoursesListProps {
  courses: Course[];
}

export default function CoursesList({ courses }: CoursesListProps) {
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const filteredCourses = showOnlyFavorites
    ? courses.filter((course) => course.favorite)
    : courses;

  return (
    <>
      <div className="flex gap-3">
        {/* TODO: Create Button component with styling */}
        <button
          className={getButtonClasses(!showOnlyFavorites)}
          onClick={() => setShowOnlyFavorites(false)}
        >
          Show All
        </button>
        <button
          className={getButtonClasses(showOnlyFavorites)}
          onClick={() => setShowOnlyFavorites(true)}
        >
          Show Only Favorites
        </button>
      </div>
      <ul className="flex flex-col gap-5 w-full max-w-3xl">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </ul>
    </>
  );
}
