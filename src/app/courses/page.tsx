import AddCourse from "@/components/course/demo/add-course";
import CourseList from "@/components/course/demo/course-list";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold mb-4">Course Marketplace</h1>

        {/* 管理员添加课程表单 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Administration</h2>
          <AddCourse />
        </div>

        {/* 课程列表 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
          <CourseList />
        </div>
      </div>

      <Toaster />
    </main>
  );
}