import CoursePurchase from "@/components/web3/course-purchase";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">课程市场</h1>
      <CoursePurchase
        web2CourseId="course-123"
        name="区块链基础课程"
        price="100"
      />
    </main>
  );
}
