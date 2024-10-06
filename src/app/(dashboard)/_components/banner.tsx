"use client";
import { useCreateProject } from "@/app/features/projects/api/use-create-project";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Banner() {
  const router = useRouter();
  const mutation = useCreateProject();

  const handleCreateProject = () => {
    mutation.mutate(
      {
        name: "Untitled Project",
        json: "",
        width: 900,
        height: 1200,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  return (
    <BackgroundGradientAnimation
      containerClassName="aspect-[4/1] min-h-[248px] flex gap-x-6 items-center p-6"
      className="absolute z-50 inset-0 flex flex-col items-center gap-x-10 justify-center font-bold px-4"
    >
      <div className="rounded-full size-20 items-center justify-center bg-white/25 hidden md:flex">
        <div className="rounded-full size-14 flex items-center justify-center bg-white/50">
          <div className="rounded-full size-8 flex items-center justify-center bg-white">
            <Sparkles className="h-8 text-blue-500 fill-blue-500" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 text-center text-2xl md:text-4xl lg:text-6xl">
        <div className="space-y-1">
          <h1 className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Visualize your ideas with our <br />
            <span className="font-bold">Canva Clone</span>
          </h1>
        </div>
        <Button
          variant={"secondary"}
          className="w-[200px] rounded-xl"
          onClick={handleCreateProject}
        >
          <span className="font-medium">Start Creating Design</span>
          <ArrowRight className="size-4 ml-2 shrink-0" />
        </Button>
      </div>
    </BackgroundGradientAnimation>
  );
}
