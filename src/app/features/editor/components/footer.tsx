import React from "react";
import { Editor } from "../../types";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Minimize, ZoomInIcon, ZoomOutIcon } from "lucide-react";

interface FooterProps {
  editor: Editor | undefined;
}

export default function Footer({ editor }: FooterProps) {
  return (
    <footer className="bg-white h-[52px] border-t w-full flex items-center overflow-x-auto z-50 p-2 shrink-0 gap-x-1 px-4 flex-row-reverse">
      <Hint
        label="Reset"
        side="top"
        sideOffset={10}
      >
        <Button
          onClick={() => editor?.autoZoom()}
          size={"icon"}
          variant={"ghost"}
          className="h-full"
        >
          <Minimize className="size-4" />
        </Button>
      </Hint>
      <Hint
        label="Zoom In"
        side="top"
        sideOffset={10}
      >
        <Button
          onClick={() => editor?.zoomIn()}
          size={"icon"}
          variant={"ghost"}
          className="h-full"
        >
          <ZoomInIcon className="size-4" />
        </Button>
      </Hint>
      <Hint
        label="Zoom Out"
        side="top"
        sideOffset={10}
      >
        <Button
          onClick={() => editor?.zoomOut()}
          size={"icon"}
          variant={"ghost"}
          className="h-full"
        >
          <ZoomOutIcon className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
}
