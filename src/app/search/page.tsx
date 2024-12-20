'use client';

import { useSearchParams } from 'next/navigation';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface Course {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviews: number;
  duration: string;
  lessons: number;
  level: string;
  tags: string[];
  price: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [filters, setFilters] = useState({
    rating: null as number | null,
    language: null as string | null,
  });

  // 模拟课程数据
  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: 'Web3 开发完全指南',
      author: 'John Doe',
      rating: 4.6,
      reviews: 50219,
      duration: '40.5小时',
      lessons: 544,
      level: '高级',
      tags: ['热门课程'],
      price: 'US$149.99'
    },
    {
      id: 2,
      title: 'DeFi 实战开发',
      author: 'Jane Smith',
      rating: 4.8,
      reviews: 12350,
      duration: '35小时',
      lessons: 420,
      level: '中级',
      tags: ['热门课程', '新课'],
      price: 'US$129.99'
    },
  ]);

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

  const filteredCourses = courses.filter(course => {
    if (filters.rating && course.rating < filters.rating) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* 过滤器侧边栏 */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-bold mb-4">评分</h3>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    className="mr-2"
                    onChange={() =>
                      setFilters((prev) => ({ ...prev, rating }))
                    }
                  />
                  {rating} 及以上
                </label>
              ))}
            </div>

            <h3 className="font-bold mt-6 mb-4">语言</h3>
            <div className="space-y-2">
              {['English', 'Chinese'].map((lang) => (
                <label key={lang} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        language: e.target.checked ? lang : null
                      }))
                    }
                  />
                  {lang}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 课程列表 */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">
            {query ? `"${query}" 的搜索结果` : '所有课程'} ({filteredCourses.length})
          </h2>
          
          <div className="space-y-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-6 rounded-lg shadow-sm flex gap-6"
              >
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex-shrink-0">
                  {/* 课程缩略图 */}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-2">作者: {course.author}</p>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(course.rating)}
                    <span className="text-gray-600">
                      ({course.reviews.toLocaleString()} 评价)
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    总共 {course.duration} • {course.lessons} 个讲座
                  </p>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
                      {course.level}
                    </span>
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xl font-bold">{course.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}