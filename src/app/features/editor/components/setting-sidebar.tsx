import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { ActiveTool, Editor } from "../../types";
import ColorPicker from "./color-picker";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";

interface SettingSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function SettingSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: SettingSidebarProps) {
  const workspace = editor?.getWorkspace();

  const initialWidth = useMemo(() => `${workspace?.width ?? 0}`, [workspace]);
  const initialHeight = useMemo(() => `${workspace?.height ?? 0}`, [workspace]);
  const initialBackground = useMemo(
    () => workspace?.fill || "#FFFFFF",
    [workspace]
  );

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(`${initialWidth}`);
    setHeight(`${initialHeight}`);
    setBackground(initialBackground);
  }, [initialBackground, initialHeight, initialWidth]);

  const changeWidth = (value: string) => setWidth(value);
  const changeHeight = (value: string) => setHeight(value);
  const changeBackground = (value: string) => {
    setBackground(value);
    editor?.changeBackground(value);
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editor?.changeSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] flex flex-col",
        activeTool === "settings" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Settings"
        description="Change the look of your workspace"
      />
      <ScrollArea>
        <form
          className="p-4 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="p-4">
            <ColorPicker
              value={background as string}
              onChange={changeBackground}
            />
          </div>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              placeholder="Height"
              value={height}
              type="number"
              onChange={(e) => changeHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              placeholder="Width"
              value={width}
              type="number"
              onChange={(e) => changeWidth(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            Resize
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
