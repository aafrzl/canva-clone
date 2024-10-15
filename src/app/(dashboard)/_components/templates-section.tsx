"use client";

import {
  ResponseTemplatesType,
  useGetTemplates,
} from "@/app/features/projects/api/use-get-templates";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutPanelTop, RefreshCcw, TriangleAlert } from "lucide-react";
import TemplateCard from "./template-card";
import { useRouter } from "next/navigation";
import { useCreateProject } from "@/app/features/projects/api/use-create-project";

export default function TemplatesSection() {
  const router = useRouter();
  const mutation = useCreateProject();

  const { data, isLoading, isError, refetch } = useGetTemplates({
    page: "1",
    limit: "4",
  });

  const handleRefetch = () => {
    refetch();
  };

  const onClickTemplate = (template: ResponseTemplatesType["data"][0]) => {
    mutation.mutate(
      {
        name: `${template.name} project`,
        json: template.json,
        width: template.width,
        height: template.height,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="inline-flex gap-x-2 items-center">
          <div className="p-2 bg-blue-500 rounded-full">
            <LayoutPanelTop className="size-5 text-background" />
          </div>
          <h3 className="font-semibold text-lg">Start from a template</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="aspect-[900/1200] rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <div className="inline-flex gap-x-2 items-center">
          <div className="p-2 bg-blue-500 rounded-full">
            <LayoutPanelTop className="size-5 text-background" />
          </div>
          <h3 className="font-semibold text-lg">Start from a template</h3>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center h-32 text-muted-foreground">
          <div className="inline-flex gap-x-2 items-center">
            <TriangleAlert className="size-8" />
            <p className="font-medium">
              Something went wrong. Please try again later.
            </p>
          </div>
          <Button
            variant={"outline"}
            onClick={handleRefetch}
          >
            <RefreshCcw className="size-4 mr-2" />
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="inline-flex gap-x-2 items-center">
        <div className="p-2 bg-blue-500 rounded-full">
          <LayoutPanelTop className="size-5 text-background" />
        </div>
        <h3 className="font-semibold text-lg">Start from a template</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
        {data.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.name || "Untitled"}
            imageSrc={template.thumbnailUrl || ""}
            onClick={() => onClickTemplate(template)}
            disabled={false}
            description={`${template.width} x ${template.height} px`}
            width={template.width}
            height={template.height}
            isPro={template.isPro}
          />
        ))}
      </div>
    </div>
  );
}
