"use client";

import { useGetCourses } from "@/client/hooks/useGetCourses";

import { Spinner } from "@/components/common";

import CoursesList from "./components/CoursesList";

export default function Courses() {
  const { data, isLoading, error } = useGetCourses();

  return (
    <main className="flex flex-col items-center h-min-screen p-5 space-y-8 bg-gray-950 text-white">
      <h1 className="font-bold text-xl md:text-2xl">Courses</h1>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        data && <CoursesList courses={data} />
      )}
    </main>
  );
}
