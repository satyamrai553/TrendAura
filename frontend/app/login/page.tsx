"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      alert("Login successful!");
      router.push("/dashboard"); // redirect to protected page
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="flex w-3/4 max-w-5xl bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl">
        
        {/* Left Section */}
        <div className="w-1/2 text-white p-12 flex flex-col justify-center bg-gradient-to-br from-purple-700 via-pink-600 to-orange-400">
          <h1 className="text-4xl font-bold mb-4">Welcome to website</h1>
          <p className="text-white/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">User Login</h2>
          
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input type="checkbox" className="accent-pink-500" />
                <span>Remember</span>
              </label>
              <a href="#" className="text-pink-500 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


