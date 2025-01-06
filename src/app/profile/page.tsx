import { Suspense } from "react";
import UserProfile from "@/components/profile/UserProfile";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  return (
    <Suspense fallback={<Skeleton className="h-[500px]" />}>
      <UserProfile />
    </Suspense>
  );
}
