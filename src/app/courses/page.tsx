"use client";

import { useGetCourses } from "@/client/hooks/useGetCourses";

import { Spinner } from "@/components/common";

import CoursesList from "./components/CoursesList";

export default function Courses() {
  const { data, isLoading, error } = useGetCourses();

  if (isLoading) {
    return <Spinner className="mt-8" />;
  }

  if (error) {
    // TODO: Improve error handling
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="flex flex-col items-center h-min-screen p-5 space-y-8 bg-gray-950 text-white">
      <h1 className="font-bold text-xl md:text-2xl">Courses</h1>
      {data && <CoursesList courses={data} />}
    </main>
  );
}
