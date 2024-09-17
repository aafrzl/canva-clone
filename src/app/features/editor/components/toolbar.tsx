import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn, isTextType } from "@/lib/utils";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { ActiveTool, Editor } from "../../types";

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
  const fontFamily = editor?.getActiveFontFamily();

  const selectedObjectTypes = editor?.selectedObjects[0]?.type;
  const isText = isTextType(selectedObjectTypes);

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 bg-white border-b h-14 w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 bg-white border-b h-14 w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint
          label="Font"
          side="bottom"
          sideOffset={5}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => onChangeActiveTool("font")}
            className={cn(
              "w-full px-2 text-sm rounded-xl",
              activeTool === "font" && "bg-gray-100"
            )}
          >
            <span className="max-w-[100px] truncate">{fontFamily}</span>
            {activeTool === "font" ? (
              <ChevronDown className="size-4 ml-1" />
            ) : (
              <ChevronUp className="size-4 ml-1" />
            )}
          </Button>
        </Hint>
      </div>

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

      {!isText && (
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
      )}

      {!isText && (
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
      )}

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

      <div className="flex items-center h-full justify-center">
        <Hint
          label="Opacity"
          side="bottom"
          sideOffset={5}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChangeActiveTool("opacity")}
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
}
