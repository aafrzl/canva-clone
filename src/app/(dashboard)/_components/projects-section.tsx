"use client";

import {
  CopyIcon,
  EllipsisVerticalIcon,
  Files,
  Loader,
  SearchXIcon,
  TrashIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { useGetProjects } from "@/app/features/projects/api/use-get-projects";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDuplicateProject } from "@/app/features/projects/api/use-duplicate-project";
import { useDeleteProject } from "@/app/features/projects/api/use-delete-project";
import { useConfirm } from "@/hooks/use-confirm";

export default function ProjectsSection() {
  const router = useRouter();
  const { ConfrimationDialog, confirm } = useConfirm(
    "Are you sure?",
    "This action cannot be undone. Are you sure you want to continue?"
  );

  const duplicateMutation = useDuplicateProject();
  const deleteMutation = useDeleteProject();

  const onCopy = (id: string) => {
    duplicateMutation.mutate({ id });
  };

  const onDelete = async (id: string) => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate({ id });
    }
  };

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();

  if (status === "pending") {
    return (
      <div className="space-y-4">
        <div className="inline-flex gap-x-2 items-center">
          <div className="p-2 bg-blue-500 rounded-full">
            <Files className="size-5 text-background" />
          </div>
          <h3 className="font-semibold text-lg">Recent Projects</h3>
        </div>
        <div className="flex items-center gap-x-2 justify-center h-32">
          <Loader className="animate-spin" />
          <p className="text-sm text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <div className="inline-flex gap-x-2 items-center">
          <div className="p-2 bg-blue-500 rounded-full">
            <Files className="size-5 text-background" />
          </div>
          <h3 className="font-semibold text-lg">Recent Projects</h3>
        </div>
        <div className="flex flex-col items-center gap-x-2 justify-center h-32">
          <TriangleAlertIcon className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!data.pages.length) {
    return (
      <div className="space-y-4">
        <div className="inline-flex gap-x-2 items-center">
          <div className="p-2 bg-blue-500 rounded-full">
            <Files className="size-5 text-background" />
          </div>
          <h3 className="font-semibold text-lg">Recent Projects</h3>
        </div>
        <div className="flex flex-col items-center gap-x-2 justify-center h-32">
          <SearchXIcon className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No projects found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ConfrimationDialog />
      <div className="inline-flex gap-x-2 items-center">
        <div className="p-2 bg-blue-500 rounded-full">
          <Files className="size-5 text-background" />
        </div>
        <h3 className="font-semibold text-lg">Recent Projects</h3>
      </div>
      <Table>
        <TableBody>
          {data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell
                    onClick={() => router.push(`/editor/${project.id}`)}
                    className="font-medium md:table-cell cursor-pointer"
                  >
                    {project.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell cursor-pointer">
                    {project.width} x {project.height} px
                  </TableCell>
                  <TableCell className="hidden md:table-cell cursor-pointer">
                    {formatDistanceToNow(new Date(project.updatedAt), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                        >
                          <EllipsisVerticalIcon className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48"
                      >
                        <DropdownMenuItem
                          onClick={() => onCopy(project.id)}
                          disabled={false}
                          className="h-10 cursor-pointer"
                        >
                          <CopyIcon className="size-4 mr-2" />
                          <span>Make a copy</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(project.id)}
                          disabled={false}
                          className="h-10 cursor-pointer"
                        >
                          <TrashIcon className="size-4 mr-2" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
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
