"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";
import { loginUserSchema } from "@trendaura/common";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validation = loginUserSchema.safeParse({email, password });
    if (!validation.success) {
      setError("Please enter valid email and password.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(validation.data);
      if (data?.data?.accessToken) {
        setSuccess("Login successful! Redirecting...");
        router.push("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="flex w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl mx-4 sm:mx-0 sm:w-3/4">
        <div className="w-1/2 text-white p-12 flex-col justify-center bg-gradient-to-br from-purple-700 via-pink-600 to-orange-400 hidden md:flex">
          <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
          <p className="text-white/80">Sign in to continue to your dashboard.</p>
        </div>
        <div className="w-full md:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">User Login</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            {success && <p className="text-sm text-green-500 text-center">{success}</p>}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input type="checkbox" className="accent-pink-500" />
                <span>Remember</span>
              </label>
              <a href="#" className="text-pink-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
