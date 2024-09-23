import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../../types";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";
import { useGetImages } from "../../images/api/use-get-images";
import { Loader, TriangleAlertIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";

interface ImageSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function ImageSidebar({
  editor,
  activeTool,
  onChangeActiveTool,
}: ImageSidebarProps) {
  const { data, isLoading, isError } = useGetImages();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] flex flex-col",
        activeTool === "images" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add images to your design"
      />
      <div className="p-4 border-b">
        <UploadButton
          appearance={{
            button: "w-full text-sm font-medium",
            allowedContent: "hidden",
          }}
          content={{
            button: "Upload Image",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            editor?.addImage(res[0].url);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <div className="inline-flex gap-x-2 items-center text-muted-foreground">
            <Loader className="size-4 animate-spin shrink-0" />
            <span className="text-sm">Loading images...</span>
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
              data.map((image) => {
                return (
                  <button
                    key={image.id}
                    onClick={() => editor?.addImage(image.urls.regular)}
                    className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-xl overflow-hidden border"
                  >
                    <Image
                      src={image.urls.small}
                      alt={image.alt_description || "Unsplash image"}
                      fill
                      className="object-cover"
                    />
                    <Link
                      href={image.links.html}
                      target="_blank"
                      rel="noreferrer"
                      className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white bg-black/50 hover:underline p-1 text-left"
                    >
                      {image.user.name}
                    </Link>
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
