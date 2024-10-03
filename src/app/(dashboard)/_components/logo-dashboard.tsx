import Image from "next/image";
import Link from "next/link";

export default function LogoDashboard() {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-x-2 hover:opacity-75 transition h-16 px-4">
        <div className="relative size-8">
          <Image
            src="/logo.svg"
            alt="logo"
            fill
          />
        </div>
        <h1 className="text-xl font-bold">Canva Clone</h1>
      </div>
    </Link>
  );
}
