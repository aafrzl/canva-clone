import { auth } from "@/auth";
import { protectPage } from "./features/auth/utils";

export default async function Home() {
  await protectPage();
  const session = await auth();

  return (
    <div className="flex flex-col justify-center items-center gap-2 h-screen container mx-auto">
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
