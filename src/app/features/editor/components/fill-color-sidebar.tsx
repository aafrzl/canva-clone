import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor, FILL_COLOR } from "../../types";
import ColorPicker from "./color-picker";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";

interface FillColorSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function FillColorSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: FillColorSidebarProps) {
  const value = editor?.getActiveFillColor() || FILL_COLOR;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: string) => {
    editor?.changeFillColor(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] flex flex-col",
        activeTool === "fill" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Fill Color"
        description="Change the fill color of the selected shape"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker
            value={value}
            onChange={onChange}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
