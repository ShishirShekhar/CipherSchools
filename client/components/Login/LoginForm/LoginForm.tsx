"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        router.push("dashboard");
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.title}>Welcome to Cipher Schools</h2>
      <p className={styles.description}>
        Login to cipher schools and learn from the best teachers in the world.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <LabelInputContainer className={styles.labelInputContainer}>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="sspdav02@gmail.com"
            autoComplete="new-email"
            value={inputData.email}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className={styles.labelInputContainer}>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={inputData.password}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        <button
          type="submit"
          className={`group/btn ${styles.submitBtn}`}
          disabled={loading}
        >
          {loading ? "Logging In" : "Log In →"}
          <BottomGradient />
        </button>

        <div className={styles.line} />

        <div>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className={styles.signUp}>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
