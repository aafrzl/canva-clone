import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  ActiveTool,
  Editor,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "../../types";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";

interface StrokeWidthSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function StrokeWidthSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSidebarProps) {
  // Get active stroke width
  const strokeWidth = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  // Get active stroke style
  const strokeDash = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const onChangeStrokeDashArray = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] flex flex-col",
        activeTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke Width"
        description="Change the stroke width and style of the selected shape"
      />
      <ScrollArea>
        <div className="p-4 space-y-6 border-b">
          <Label>Stroke Width</Label>
          <Slider
            value={[strokeWidth]}
            onValueChange={([value]) => onChangeStrokeWidth(value)}
          />
        </div>

        <div className="p-4 space-y-4 border-b">
          <Label>Stroke type</Label>
          <Button
            variant={"secondary"}
            size={"lg"}
            className={cn(
              "w-full h-16 justify-start text-left px-4 py-2",
              JSON.stringify(strokeDash) === `[]` && "border-2 border-blue-500"
            )}
            onClick={() => onChangeStrokeDashArray([])}
          >
            <div className="w-full border-black rounded-full border-4" />
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            className={cn(
              "w-full h-16 justify-start text-left px-4 py-2",
              JSON.stringify(strokeDash) === `[5,5]` &&
                "border-2 border-blue-500"
            )}
            onClick={() => onChangeStrokeDashArray([5, 5])}
          >
            <div className="w-full border-black rounded-sm border-4 border-dashed" />
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
