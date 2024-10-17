import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useGenerateImage } from "../../ai/api/use-generate-image";
import { ActiveTool, Editor } from "../../types";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";
import { Loader, SparklesIcon } from "lucide-react";
import { usePaywall } from "../../subscriptions/hooks/use-paywall";

interface AiSidebarbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function AiSidebarbar({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarbarProps) {
  const { shouldBlock, triggerPaywall } = usePaywall();
  const mutation = useGenerateImage();

  const [value, setValue] = useState("");

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate(
      { prompt: value },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
          setValue("");
        },
      }
    );
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="AI Images"
        description="Generate images using AI models"
      />
      <ScrollArea>
        <form
          onSubmit={onSubmit}
          className="p-4 space-y-6"
        >
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter a prompt"
            cols={30}
            rows={10}
            required
          />
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader className="animate-spin mr-2 size-4" />
            ) : (
              <SparklesIcon className="size-4 mr-2" />
            )}
            <span>Generate Image</span>
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
