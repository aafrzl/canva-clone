"use client";

import { useGetTemplatesUser } from "@/app/features/projects/api/use-get-templates-user";
import { Skeleton } from "@/components/ui/skeleton";
import { Files, Loader, SearchXIcon, TriangleAlert } from "lucide-react";
import TemplateCard from "../../_components/template-card";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";

export default function TemplatesUserSection() {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetTemplatesUser();

  if (status === "pending") {
    return (
      <div className="space-y-4">
        <div className="inline-flex gap-x-2 items-center w-full">
          <div className="p-2 bg-blue-500 rounded-full">
            <Files className="size-5 text-background" />
          </div>
          <h3 className="font-semibold text-lg">Recent Uploaded Templates</h3>
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

  if (status === "error") {
    return (
      <div className="space-y-4">
        <div className="inline-flex gap-x-2 items-center w-full">
          <div className="p-2 bg-blue-500 rounded-full">
            <Files className="size-5 text-background" />
          </div>
          <h3 className="font-semibold text-lg">Recent Uploaded Templates</h3>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center h-32 text-muted-foreground">
          <div className="inline-flex gap-x-2 items-center">
            <TriangleAlert className="size-8" />
            <p className="font-medium">
              Something went wrong. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data.pages.length || data.pages[0].data.length === 0) {
    return (
      <div className="space-y-4">
        <div className="inline-flex gap-x-2 items-center w-full">
          <div className="p-2 bg-blue-500 rounded-full">
            <Files className="size-5 text-background" />
          </div>
          <h3 className="font-semibold text-lg">Recent Uploaded Templates</h3>
        </div>
        <div className="flex flex-col items-center gap-x-2 justify-center h-32">
          <SearchXIcon className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            You don&apos;t have any templates yet. Create one now!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="inline-flex gap-x-2 items-center w-full">
        <div className="p-2 bg-blue-500 rounded-full">
          <Files className="size-5 text-background" />
        </div>
        <h3 className="font-semibold text-lg">Recent Uploaded Templates</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.data.map((template) => {
              return (
                <TemplateCard
                  key={template.id}
                  title={template.name || "Untitled"}
                  imageSrc={template.thumbnailUrl || ""}
                  disabled={false}
                  description={`${template.width} x ${template.height} px`}
                  width={template.width}
                  height={template.height}
                  isPro={template.isPro}
                  isTemplateUser={true}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
      {hasNextPage && (
        <div className="w-full flex items-center justify-center pt-4">
          <Button
            variant={"outline"}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage && (
              <Loader className="size-4 animate-spin mr-2" />
            )}
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}
