"use client";

import { useState } from "react";
import { register } from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !email || !password) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await register(username, email, password);

            if (res.user) {
                alert("Signup successful! Please login.");
                router.push("/login");
            } else {
                alert(res.message || "Signup failed");
            }
        } catch (err) {
            alert("Error during signup");
            console.error(err);
        }
    };


    return (
        <div className="max-w-md mx-auto p-6 mt-12 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
            <form onSubmit={handleSignup} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Sign Up
                </button>
            </form>
            <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                    Log in here
                </Link>
            </p>
        </div>
    );
}
