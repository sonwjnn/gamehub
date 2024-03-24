"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";

const HomePage = () => {
  const user = useCurrentUser();

  if (!user) {
    return redirect("/auth/login");
  }

  return <div>{JSON.stringify(user)}</div>;
};

export default HomePage;
