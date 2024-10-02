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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSignUp } from "../hooks/use-sign-up";
import { Loader } from "lucide-react";

export default function SignUpCard() {
  const mutation = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCredentialsSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
          });
        },
      }
    );
  };

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
        <form
          onSubmit={onCredentialsSignUp}
          className="space-y-2.5"
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            placeholder="Full name"
            disabled={mutation.isPending}
            required
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            disabled={mutation.isPending}
            required
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            disabled={mutation.isPending}
            minLength={6}
            required
          />
          <Button
            type="submit"
            size={"lg"}
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending && (
              <Loader className="mr-2 animate-spin size-5" />
            )}
            <span>Continue</span>
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignIn("google")}
            size={"lg"}
            className="w-full relative"
            disabled={mutation.isPending}
            variant={"outline"}
          >
            <FcGoogle className="mr-2 size-5 top-3 left-2.5 absolute" />
            <span className="font-medium">Continue with Google</span>
          </Button>
          <Button
            onClick={() => onProviderSignIn("github")}
            size={"lg"}
            className="w-full relative"
            disabled={mutation.isPending}
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
