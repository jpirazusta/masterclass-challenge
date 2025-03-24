"use client";

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import { useGetCourses } from "@/client/hooks/useGetCourses";

import { Spinner } from "@/components/common";

import CoursesList from "./components/CoursesList";

const getButtonClasses = (active: boolean) =>
  classNames(
    "font-semibold text-gray-400 bg-gray-900 rounded-sm px-4 py-1 cursor-pointer",
    {
      "text-white bg-gray-950 border border-yellow-200": active,
    }
  );

export default function Courses() {
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCourses();

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

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
      {data?.pages.map((page, index) => (
        <CoursesList
          key={index}
          courses={page.data}
          showOnlyFavorites={showOnlyFavorites}
        />
      ))}
      <div ref={loadMoreRef} className="mt-4">
        {isFetchingNextPage && <Spinner />}
      </div>
    </main>
  );
}
