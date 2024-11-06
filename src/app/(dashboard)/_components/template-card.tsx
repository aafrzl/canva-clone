import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CrownIcon, MoreVertical, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

interface TemplateCardProps {
  imageSrc: string;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  description: string;
  width: number;
  height: number;
  isPro: boolean | null;
  isTemplateUser: boolean;
}

export default function TemplateCard({
  imageSrc,
  title,
  onClick,
  disabled,
  description,
  width,
  height,
  isPro,
  isTemplateUser,
}: TemplateCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "space-y-2 group text-left transition flex flex-col",
        disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer"
      )}
    >
      <div
        style={{
          aspectRatio: `${width}/${height}`,
        }}
        className="relative rounded-xl h-full w-full overflow-hidden border"
      >
        <Image
          fill
          src={imageSrc}
          alt={title}
          sizes="calc(100vw - 2rem)"
          className="object-cover transition transform group-hover:scale-105"
        />
        {isPro && (
          <div className="absolute top-2 right-2 h-10 w-10 flex items-center justify-center bg-black/50 rounded-full z-[1]">
            <CrownIcon className="size-5 text-yellow-500 fill-yellow-500" />
          </div>
        )}
        <div className="opacity-0 group-hover:opacity-100 transition absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl backdrop-filter backdrop-blur-sm">
          {isTemplateUser ? (
            <>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="absolute top-2 right-2"
                  >
                    <MoreVertical className="size-5 hprtext-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {}} //TODO: Add functionality to delete user template
                    className="flex items-center space-x-2"
                  >
                    <Trash className="size-5 text-red-500 stroke-red-500" />
                    <span className="ml-2">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="space-y-1 text-white text-center">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs">{description}</p>
              </div>
            </>
          ) : (
            <p className="text-white font-medium">Open in editor</p>
          )}
        </div>
      </div>
      {!isTemplateUser && (
        <div className="space-y-1">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-75 transition">
            {description}
          </p>
        </div>
      )}
    </button>
  );
}
