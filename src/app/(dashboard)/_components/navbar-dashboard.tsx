import UserButton from "@/app/features/auth/components/user-button";
import React from "react";

export default function NavbarDashboard() {
  return (
    <nav className="w-full flex items-center p-4 h-16">
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
}
