"use client";
import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}
