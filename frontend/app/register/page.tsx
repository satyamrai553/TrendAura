"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";
import { registerUserSchema } from "@trendaura/common";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    fullname: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setError("");
    setSuccess("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validation = registerUserSchema.safeParse(formData);
    if (!validation.success) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(validation.data);
      if (data?.token) {
        setSuccess("Registration successful! Redirecting to login...");
        router.push("/login");
      } else {
        setSuccess("Registration successful! You can now log in.");
      }

      setFormData({
        email: "",
        phoneNumber: "",
        fullname: "",
        password: "",
        role: "customer",
      });
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="flex w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl mx-4 sm:mx-0 sm:w-3/4">
        <div className="w-1/2 text-white p-12 flex-col justify-center bg-gradient-to-br from-purple-700 via-pink-600 to-orange-400 hidden md:flex">
          <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
          <p className="text-white/80">
            Create an account to get started. It's quick, easy, and unlocks a world of features.
          </p>
        </div>
        <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Create Account</h2>
          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none bg-white text-gray-500"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
            </select>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            {success && <p className="text-sm text-green-500 text-center">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "REGISTER"}
            </button>

            <div className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-pink-500 hover:underline">
                Login here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
