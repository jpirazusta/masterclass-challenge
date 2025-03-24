"use client";

import { useGetCourses } from "@/client/hooks/useGetCourses";

import CourseCard from "@/app/courses/components/CourseCard";
import CoursesList from "./components/CoursesList";

export default function Courses() {
  const { data, isLoading, error } = useGetCourses();

  return (
    <main className="flex flex-col items-center h-min-screen p-5 space-y-5">
      <h1>Courses</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        data && <CoursesList courses={data} />
      )}
    </main>
  );
}
