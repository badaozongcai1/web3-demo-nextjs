'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Star } from "lucide-react";
import { Course } from "@/lib/web3/contract-utils";

interface CourseData extends Course {
  hasPurchased?: boolean;
}

interface CourseListProps {
  courses: CourseData[];
  isLoading: boolean;
  onPurchase: (course: CourseData) => Promise<void>;
}

export function CourseList({ courses, isLoading, onPurchase }: CourseListProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2">{rating}</span>
      </div>
    );
  };

  const renderCourseStatus = (course: CourseData) => {
    if (course.hasPurchased) {
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
          已购买
        </span>
      );
    }
    
    if (course.isActive) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
          可购买
        </span>
      );
    }

    return (
      <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
        已下架
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <Skeleton className="w-48 h-48 rounded-lg" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <Card key={course.web2CourseId}>
          <CardContent className="p-6">
            <div className="flex gap-6">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-gray-500">课程封面</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(4.5)}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {renderCourseStatus(course)}
                  {course.hasPurchased && (
                    <span className="text-gray-500">已拥有此课程</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold">{course.price} YD</div>
                  {course.hasPurchased ? (
                    <Button variant="outline" disabled>
                      已拥有
                    </Button>
                  ) : (
                    <Button
                      onClick={() => onPurchase(course)}
                      disabled={!course.isActive}
                    >
                      购买课程
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}