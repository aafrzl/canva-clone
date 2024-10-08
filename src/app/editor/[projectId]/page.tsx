"use client";
import { Editor } from "@/app/features/editor/components/editor";
import { useGetProject } from "@/app/features/projects/api/use-get-project";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";

interface EditorProjectIdProps {
  params: {
    projectId: string;
  };
}

export default function EditorProjectId({ params }: EditorProjectIdProps) {
  const { data, isLoading, isError, error } = useGetProject(params.projectId);

  if (isLoading || !data) {
    return (
      <div className="h-full flex gap-x-2 items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
        <p className="text-base text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <TriangleAlertIcon className="size-8 text-destructive" />
        <p className="text-base text-muted-foreground">
          {error instanceof Error ? error.message : "Failed to fetch project"}
        </p>
        <Button
          asChild
          variant={"secondary"}
        >
          <Link href={"/"}>
            <ArrowLeft className="size-4 mr-2" />
            <span>Back to home</span>
          </Link>
        </Button>
      </div>
    );
  }

  return <Editor initialData={data} />;
}
