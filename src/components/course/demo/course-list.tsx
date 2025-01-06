"use client";

import { useEffect, useState } from "react";
import { web3Contract } from "@/lib/web3/ethers/contract-utils";
import type { Course } from "@/lib/web3/ethers/contract-utils";
import CoursePurchase from "./course-purchase";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
    // 监听课程添加事件
    const handleCourseAdded = () => {
      loadCourses();
    };

    window.addEventListener("courseAdded", handleCourseAdded);

    return () => {
      window.removeEventListener("courseAdded", handleCourseAdded);
    };
  }, []);

  const loadCourses = async () => {
    try {
      await web3Contract.connect();
      const courseList = await web3Contract.getCourseList();
      setCourses(courseList.filter((course) => course.isActive));
    } catch (err: any) {
      setError(err.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg" />
        <Skeleton className="h-[200px] w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (courses.length === 0) {
    return (
      <div className="text-center text-gray-500">No courses available yet.</div>
    );
  }

  return (
    <div className="grid gap-6">
      {courses.map((course) => (
        <CoursePurchase
          key={course.web2CourseId}
          web2CourseId={course.web2CourseId}
          name={course.name}
          price={course.price}
        />
      ))}
    </div>
  );
}
