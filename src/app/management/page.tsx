// src/app/management/page.tsx
import AddCourseComponent from "@/components/course/demo/add-course";
import { WalletConnectionSelector } from "@/components/web3/WalletConnectionSelector";

export default function AddCoursePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">连接钱包</h1>

        <WalletConnectionSelector />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-8">新增课程</h2>
          <AddCourseComponent />
        </div>
      </div>
    </div>
  );
}
