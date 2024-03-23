"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";

const HomePage = () => {
  const user = useCurrentUser();

  if (!user) {
    return redirect("/auth/login");
  }

  return redirect("/chat");
};

export default HomePage;
