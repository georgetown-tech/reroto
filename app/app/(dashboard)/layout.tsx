import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="min-h-screen dark:bg-black sm:pl-60">
        <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
          <div className="flex flex-col space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
