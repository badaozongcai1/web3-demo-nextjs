'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface CourseFilterProps {
  filters: {
    purchased: boolean;
  };
  onFilterChange: (name: string, value: boolean) => void;
}

export function CourseFilter({ filters, onFilterChange }: CourseFilterProps) {
  return (
    <Card className="w-64 flex-shrink-0 h-fit">
      <CardHeader>
        <CardTitle>筛选</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="purchased">
              <input
                id="purchased"
                type="checkbox"
                className="mr-2"
                checked={filters.purchased}
                onChange={(e) => onFilterChange('purchased', e.target.checked)}
              />
              仅显示已购买
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}