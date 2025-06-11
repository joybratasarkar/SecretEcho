"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Ensure this runs only on client
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      router.replace(token ? "/chat" : "/login"); // ✅ use replace instead of push
    }
  }, [router]); // ✅ add router to dependency array

  return <p className="text-center">Redirecting...</p>;
}
