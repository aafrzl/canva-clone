import SignInCard from "@/app/features/auth/components/sign-in-card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session) redirect("/");

  return <SignInCard />;
}
