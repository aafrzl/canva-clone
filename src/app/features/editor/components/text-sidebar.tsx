import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../../types";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";

interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function TextSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: TextSidebarProps) {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] flex flex-col",
        activeTool === "text" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Text"
        description="Add text to your design"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <Button
            className="w-full"
            onClick={() => editor?.addText("Your paragraph text")}
          >
            Add a textbox
          </Button>
          <Button
            className="w-full h-16"
            variant={"secondary"}
            onClick={() =>
              editor?.addText("Add a heading", {
                fontSize: 80,
                fontWeight: 700,
              })
            }
          >
            <span className="text-3xl font-bold">Add a heading</span>
          </Button>
          <Button
            className="w-full h-16"
            variant={"secondary"}
            onClick={() =>
              editor?.addText("Add a subheading", {
                fontSize: 44,
                fontWeight: 600,
              })
            }
          >
            <span className="text-xl font-semibold">Add a subheading</span>
          </Button>
          <Button
            className="w-full h-16"
            variant={"secondary"}
            size={"lg"}
            onClick={() => editor?.addText("Paragraph", { fontSize: 32 })}
          >
            Add a paragraph
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
