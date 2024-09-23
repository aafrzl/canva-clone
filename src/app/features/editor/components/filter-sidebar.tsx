import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor, filters } from "../../types";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";

interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function FilterSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterSidebarProps) {
  const value = null;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] flex flex-col",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Filters"
        description="Change the filter of the selected image"
      />
      <ScrollArea>
        <div className="p-4 space-y-2 border-b">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={"secondary"}
              size={"lg"}
              className={cn(
                "w-full h-16 justify-center text-center",
                value === filter && "border-2 border-primary"
              )}
              onClick={() => editor?.changeFilterImage(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
