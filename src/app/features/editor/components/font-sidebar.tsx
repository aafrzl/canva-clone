import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor, fonts } from "../../types";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";

interface FontSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function FontSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) {
  const value = editor?.getActiveFontFamily();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] flex flex-col",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Font"
        description="Modify the font family on the selected text"
      />
      <ScrollArea>
        <div className="p-4 space-y-2">
          {fonts.map((font) => (
            <Button
              key={font}
              variant={"secondary"}
              size={"lg"}
              className={cn(
                "w-full h-16 text-base px-2 py-4 transition-all duration-300 ease-in-out",
                value === font && "border-2 border-blue-500"
              )}
              style={{
                fontFamily: font,
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
