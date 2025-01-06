import AddCourseComponent from "@/components/course/demo/add-course";

export default function AddCoursePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      后台管理
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">新增课程</h1>
        <AddCourseComponent />
      </div>
    </div>
  );
}
