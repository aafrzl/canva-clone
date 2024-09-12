import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { IoTriangle } from "react-icons/io5";
import { ActiveTool, Editor } from "../../types";
import ShapeTool from "./shape-tool";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";

interface ShapeSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function ShapeSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: ShapeSidebarProps) {
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] flex flex-col",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      <ToolSidebarClose onClick={() => onChangeActiveTool("select")} />
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool
            onClick={() => editor?.addCircle()}
            icon={FaCircle}
          />
          <ShapeTool
            onClick={() => editor?.addRectangleSoft()}
            icon={FaSquare}
          />
          <ShapeTool
            onClick={() => editor?.addRectangle()}
            icon={FaSquareFull}
          />
          <ShapeTool
            onClick={() => editor?.addTriangle()}
            icon={IoTriangle}
          />
          <ShapeTool
            onClick={() => editor?.addInverseTriangle()}
            icon={IoTriangle}
            iconClassName="rotate-180"
          />
          <ShapeTool
            onClick={() => editor?.addDiamond()}
            icon={FaDiamond}
          />
        </div>
      </ScrollArea>
    </aside>
  );
}
