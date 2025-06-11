"use client";
import { useState } from "react";
import { login } from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ✅ import Link

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const res = await login(username, password);
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user_id", res.user_id);
      localStorage.setItem("username", res.username);
      router.push("/chat");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form onSubmit={handleLogin} className="space-y-2">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>

      {/* ✅ Add Signup Link */}
      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
