import SignUpCard from "@/app/features/auth/components/sign-up-card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session) redirect("/");

  return <SignUpCard />;
}
