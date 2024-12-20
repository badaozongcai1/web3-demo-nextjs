import { Search } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            面向Web3开发者的在线学习平台
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            使用 Web3 钱包登录，开启您的学习之旅
          </p>
          
          <form action="/search" className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="搜索课程、技术栈..."
                className="flex-1 px-6 py-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <Search size={20} />
                搜索
              </button>
            </div>
          </form>
          
          {/* Featured Courses Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-8">热门课程</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Course Cards */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                  <h3 className="font-bold text-lg mb-2">Web3 开发课程 {i}</h3>
                  <p className="text-gray-600 mb-4">
                    学习如何构建去中心化应用和智能合约
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">40小时课程</span>
                    <span className="font-bold">¥999</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}