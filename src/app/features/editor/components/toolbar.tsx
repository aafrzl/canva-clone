import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ActiveTool, Editor } from "../../types";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function Toolbar({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 bg-white border-b h-14 w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 bg-white border-b h-14 w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint
          label="Fill Color"
          side="bottom"
          sideOffset={5}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChangeActiveTool("fill")}
            className={cn(activeTool === "fill" && "bg-gray-100")}
          >
            <div
              className="rounded-sm size-4 border"
              style={{
                backgroundColor: fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint
          label="Stoke Color"
          side="bottom"
          sideOffset={5}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChangeActiveTool("stroke-color")}
            className={cn(activeTool === "stroke-color" && "bg-gray-100")}
          >
            <div
              className="rounded-sm size-4 border-2 bg-white"
              style={{
                borderColor: strokeColor,
              }}
            />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint
          label="Stoke Width"
          side="bottom"
          sideOffset={5}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChangeActiveTool("stroke-width")}
            className={cn(activeTool === "stroke-width" && "bg-gray-100")}
          >
            <BsBorderWidth className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint
          label="Bring Foward"
          side="bottom"
          sideOffset={5}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => editor?.bringForward()}
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint
          label="Send Backward"
          side="bottom"
          sideOffset={5}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => editor?.sendBackward()}
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
}
