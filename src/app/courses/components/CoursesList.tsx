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
  showOnlyFavorites: boolean;
}

export default function CoursesList({
  courses,
  showOnlyFavorites,
}: CoursesListProps) {
  const filteredCourses = showOnlyFavorites
    ? courses.filter((course) => course.favorite)
    : courses;

  return (
    <>
      <ul className="flex flex-col gap-5 w-full max-w-3xl">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        {/* TODO: Add empty state */}
      </ul>
    </>
  );
}
