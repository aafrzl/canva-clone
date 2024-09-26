"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDownIcon,
  DownloadCloud,
  MousePointerClickIcon,
  Redo2,
  Undo2,
} from "lucide-react";
import { BsCloudCheck } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import Logo from "./logo";
import { ActiveTool, Editor } from "../../types";
import { useFilePicker } from "use-file-picker";
import { cn } from "@/lib/utils";

interface NavbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function Navbar({
  editor,
  activeTool,
  onChangeActiveTool,
}: NavbarProps) {
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
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Saved</p>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
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
          {/* TODO: Add user button component */}
        </div>
      </div>
    </nav>
  );
}
