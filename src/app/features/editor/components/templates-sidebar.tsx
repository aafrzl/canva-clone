import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CrownIcon, Loader, TriangleAlertIcon } from "lucide-react";
import Image from "next/image";
import {
  ResponseTemplatesType,
  useGetTemplates,
} from "../../projects/api/use-get-templates";
import { ActiveTool, Editor } from "../../types";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useConfirm } from "@/hooks/use-confirm";

interface TemplatesSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function TemplatesSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: TemplatesSidebarProps) {
  const { ConfrimationDialog, confirm } = useConfirm(
    "Are you sure?",
    "This will clear your current design. Cannot be undone."
  );

  const { data, isLoading, isError } = useGetTemplates({
    page: "1",
    limit: "20",
  });

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClick = async (template: ResponseTemplatesType["data"][0]) => {
    const isConfirmed = await confirm();

    if (isConfirmed) {
      editor?.loadJson(template.json);
    }
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] flex flex-col",
        activeTool === "templates" ? "visible" : "hidden"
      )}
    >
      <ConfrimationDialog />
      <ToolSidebarHeader
        title="Templates"
        description="Choose from a variety of templates to get started."
      />
      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <div className="inline-flex gap-x-2 items-center text-muted-foreground">
            <Loader className="size-4 animate-spin shrink-0" />
            <span className="text-sm">Loading Templates...</span>
          </div>
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-2 items-center justify-center flex-1 text-muted-foreground">
          <TriangleAlertIcon className="size-8" />
          <span className="text-sm">
            Something went wrong. Please try again later.
          </span>
        </div>
      )}

      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2">
            {data &&
              data.map((template) => {
                return (
                  <button
                    style={{
                      aspectRatio: `${template.width}/${template.height}`,
                    }}
                    key={template.id}
                    onClick={() => onClick(template)}
                    className="relative w-full group hover:opacity-75 transition bg-muted rounded-xl overflow-hidden border"
                  >
                    <Image
                      src={template.thumbnailUrl || ""}
                      alt={template.name || "Template thumbnail"}
                      fill
                      className="object-cover"
                    />
                    {template.isPro && (
                      <div className="absolute top-2 right-2 flex items-center justify-center p-2 bg-black/50 rounded-full">
                        <CrownIcon className="size-4 fill-yellow-500 text-yellow-500" />
                      </div>
                    )}
                    <div
                      rel="noreferrer"
                      className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white bg-black/50 p-1 text-left"
                    >
                      {template.name}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
