import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col justify-center items-center gap-2 h-screen container mx-auto">
      <p>{JSON.stringify(session, null, 2)}</p>
    </div>
  );
}
