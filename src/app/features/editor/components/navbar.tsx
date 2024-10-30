"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useMutationState } from "@tanstack/react-query";
import {
  ChevronDownIcon,
  DownloadCloud,
  Loader,
  MousePointerClickIcon,
  PencilIcon,
  Redo2,
  Undo2,
} from "lucide-react";
import { useState } from "react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { useFilePicker } from "use-file-picker";
import UserButton from "../../auth/components/user-button";
import { useGetProject } from "../../projects/api/use-get-project";
import { useUpdateProject } from "../../projects/api/use-update-project";
import { ActiveTool, Editor } from "../../types";
import Logo from "./logo";

interface NavbarProps {
  id: string;
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function Navbar({
  id,
  editor,
  activeTool,
  onChangeActiveTool,
}: NavbarProps) {
  const { data: dataProject, isLoading: isLoadingProject } = useGetProject(id);

  const mutationUpdateProject = useUpdateProject(id);

  const [projectName, setProjectName] = useState(dataProject?.name);
  const [isEditing, setIsEditing] = useState(false);

  const data = useMutationState({
    filters: {
      mutationKey: ["project", { id }],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });

  const currentStatus = data[data.length - 1];

  const isError = currentStatus === "error";
  const isPending = currentStatus === "pending";

  const { openFilePicker } = useFilePicker({
    accept: ".json",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              size={"sm"}
              variant={"ghost"}
            >
              <span>File</span>
              <ChevronDownIcon className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-60"
          >
            <DropdownMenuItem
              onClick={() => openFilePicker()}
              className="flex items-center gap-2"
            >
              <CiFileOn className="size-8" />
              <div>
                <p className="font-medium">Open</p>
                <p className="text-sm text-muted-foreground">
                  Open a JSON File
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator
          orientation="vertical"
          className="mx-2"
        />
        <Hint
          label="Select"
          side="bottom"
          sideOffset={10}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChangeActiveTool("select")} // TODO: Add some functionality later
            className={cn(activeTool === "select" && "bg-gray-100")}
          >
            <MousePointerClickIcon className="size-4" />
          </Button>
        </Hint>
        <Hint
          label="Undo"
          side="bottom"
          sideOffset={10}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => editor?.onUndo()}
            disabled={!editor?.canUndo()}
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint
          label="Redo"
          side="bottom"
          sideOffset={10}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => editor?.onRedo()}
            disabled={!editor?.canRedo()}
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator
          orientation="vertical"
          className="mx-2"
        />

        {isPending && (
          <div className="flex items-center gap-x-2">
            <Loader className="size-4 animate-spin text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Saving...</p>
          </div>
        )}

        {!isPending && isError && (
          <div className="flex items-center gap-x-2">
            <BsCloudSlash className="size-[20px] text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Failed to save</p>
          </div>
        )}

        {!isPending && !isError && (
          <div className="flex items-center gap-x-2">
            <BsCloudCheck className="size-[20px] text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
        )}

        <div className="ml-auto flex items-center gap-x-4">
          {isLoadingProject && <Skeleton className="w-40 h-8" />}
          {dataProject?.name && !isLoadingProject && (
            <>
              {isEditing ? (
                <Input
                  value={projectName || ""}
                  onChange={(e) => setProjectName(e.target.value)}
                  onBlur={() => {
                    if (projectName !== dataProject?.name) {
                      mutationUpdateProject.mutate({
                        name: projectName,
                      });
                    }
                    setIsEditing(false);
                  }}
                  className="w-40"
                />
              ) : (
                <span
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer group inline-flex items-center gap-x-1"
                >
                  <span className="text-sm">{projectName}</span>
                  <PencilIcon className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
                </span>
              )}
            </>
          )}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                size={"sm"}
                variant={"ghost"}
              >
                <span>Export</span>
                <DownloadCloud className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-60"
            >
              <DropdownMenuItem
                onClick={() => editor?.saveJson()}
                className="flex items-center gap-2"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p className="font-medium">JSON</p>
                  <p className="text-sm text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.savePng()}
                className="flex items-center gap-2"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p className="font-medium">PNG</p>
                  <p className="text-sm text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.saveJpg()}
                className="flex items-center gap-2"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p className="font-medium">JPG</p>
                  <p className="text-sm text-muted-foreground">
                    Best for printing and sharing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.saveSvg()}
                className="flex items-center gap-2"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p className="font-medium">SVG</p>
                  <p className="text-sm text-muted-foreground">
                    Best for vector editing
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
