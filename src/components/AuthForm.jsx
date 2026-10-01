"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Leaf } from "lucide-react";

import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export const AuthForm = ({ type }) => {
  const isLoginForm = type === "login";

  const router = useRouter();
  const supabase = createClient();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");

    setError(null);
    setMessage(null);

    // Validate signup password
    if (!isLoginForm && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      if (isLoginForm) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

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

      // Email confirmation disabled
      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      // Email confirmation enabled
      setMessage("Check your email to confirm your account.");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Branding */}
      <div className="px-6 pt-2 text-center sm:px-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center">
          <Image src="/image.png" width={50} height={50} alt="logo" />
        </div>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
          AgriQueue
        </h2>

        <p className="mt-1 text-sm font-medium text-gray-600">
          Smart Agricultural Procurement & Queue Management
        </p>
      </div>

      <CardContent className="grid w-full gap-4 px-6 pt-8 sm:px-8">
        {!isLoginForm && (
          <>
            <Field
              id="full_name"
              label="Full Name"
              placeholder="e.g. Ali Khan"
              disabled={isPending}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                id="phone"
                label="Phone Number"
                placeholder="03XXXXXXXXX"
                type="tel"
                disabled={isPending}
              />

              <Field
                id="identification"
                label="CNIC"
                placeholder="XXXXX-XXXXXXX-X"
                disabled={isPending}
              />
            </div>

            <Field
              id="location"
              label="Location"
              placeholder="e.g. Lahore, Punjab"
              disabled={isPending}
            />
          </>
        )}

        <Field
          id="email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          disabled={isPending}
        />

        <Field
          id="password"
          label="Password"
          placeholder="••••••••"
          type="password"
          minLength={6}
          disabled={isPending}
        />

        {!isLoginForm && (
          <Field
            id="confirm_password"
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
            minLength={6}
            disabled={isPending}
          />
        )}


        {error && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-primary">
            {message}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-6 px-6 pb-8 sm:px-8">
        <Button
          type="submit"
          className="w-full bg-primary! py-6 text-sm font-semibold hover:bg-primary/80"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              {isLoginForm ? "Logging in..." : "Creating account..."}
            </>
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Create Account"
          )}
        </Button>

        <p className="text-sm text-gray-600">
          {isLoginForm
            ? "Don't have an account? "
            : "Already have an account? "}

          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`font-semibold text-primary hover:text-green-500 hover:underline ${
              isPending ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

function Field({ id, label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={id}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </Label>

      <Input
        id={id}
        name={id}
        required
        className="h-11 rounded-lg bg-gray-50/50 focus-visible:border-primary focus-visible:ring-primary"
        {...props}
      />
    </div>
  );
}