"use client";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export const AuthForm = ({ type }) => {
  const isLoginForm = type === "login";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    setError(null);
    setMessage(null);

    startTransition(async () => {
      if (isLoginForm) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          setError(error.message);
          return;
        }

        router.push("/dashboard");
        router.refresh();
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: formData.get("full_name"),
            phone: formData.get("phone"),
            location: formData.get("location"),
            identification: formData.get("identification"),
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Email confirmation OFF -> session exists immediately
      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      // Email confirmation ON
      setMessage("Check your email to confirm your account.");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        {!isLoginForm && (
          <>
            <Field id="full_name" label="Full name" placeholder="Your full name" disabled={isPending} />
            <Field id="phone" label="Phone" placeholder="03XX-XXXXXXX" type="tel" disabled={isPending} />
            <Field id="location" label="Location" placeholder="Village / district" disabled={isPending} />
            <Field id="identification" label="CNIC / ID number" placeholder="Identification number" disabled={isPending} />
          </>
        )}

        <Field id="email" label="Email" placeholder="Enter your email" type="email" disabled={isPending} />
        <Field
          id="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          minLength={6}
          disabled={isPending}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}
      </CardContent>

      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm ? "Don't have an account yet?" : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

// Small helper to avoid repeating label + input markup
function Field({ id, label, ...props }) {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} required {...props} />
    </div>
  );
}