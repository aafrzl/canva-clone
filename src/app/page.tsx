import { protectPage } from "./features/auth/utils";

export default async function Home() {
  await protectPage();
  
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-screen container mx-auto">
      <p>You are login</p>
    </div>
  );
}
