"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignUpCard() {
  const onProviderSignIn = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Use your email or another service to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 p-0">
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignIn("google")}
            size={"lg"}
            className="w-full relative"
            variant={"outline"}
          >
            <FcGoogle className="mr-2 size-5 top-3 left-2.5 absolute" />
            <span className="font-medium">Continue with Google</span>
          </Button>
          <Button
            onClick={() => onProviderSignIn("github")}
            size={"lg"}
            className="w-full relative"
            variant={"outline"}
          >
            <FaGithub className="mr-2 size-5 top-3 left-2.5 absolute" />
            <span className="font-medium">Continue with Github</span>
          </Button>
          <p className="text-xs text-muted-foreground">
            Already have account?{" "}
            <Link
              href={"/sign-in"}
              className="text-sky-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
