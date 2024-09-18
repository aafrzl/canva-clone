import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor, fonts } from "../../types";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useEffect, useState } from "react";

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
  const [loadedFonts, setLoadedFonts] = useState<string[]>([]);

  useEffect(() => {
    const loadFonts = async () => {
      const WebFonts = await import("webfontloader");
      WebFonts.load({
        google: {
          families: fonts.filter((font) => !isDefaultFont(font)),
        },
        active: () => {
          setLoadedFonts(fonts);
        },
      });
    };

    loadFonts();
  }, []);

  const value = editor?.getActiveFontFamily();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const isDefaultFont = (font: string) => {
    const defaultFonts = [
      "Arial",
      "Georgia",
      "Times New Roman",
      "Verdana",
      "Courier New",
      "Lucida Console",
      "Comic Sans MS",
      "Impact",
    ];

    return defaultFonts.includes(font);
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
          <div className="font-bold mb-2">Default Fonts</div>
          {fonts.filter(isDefaultFont).map((font) => (
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
          <div className="font-bold mb-2">Google Fonts</div>
          {loadedFonts
            .filter((font) => !isDefaultFont(font))
            .map((fontFamily, index) => (
              <Button
                key={index}
                variant={"secondary"}
                size={"lg"}
                className={cn(
                  "w-full h-16 text-base px-2 py-4 transition-all duration-300 ease-in-out",
                  value === fontFamily && "border-2 border-blue-500"
                )}
                style={{
                  fontFamily: fontFamily,
                }}
                onClick={() => editor?.changeFontFamily(fontFamily)}
              >
                {fontFamily}
              </Button>
            ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
