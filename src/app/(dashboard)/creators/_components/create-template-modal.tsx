"use client";
import { useCreateTemplate } from "@/app/features/projects/api/use-create-template";
import { useCreateTemplateModal } from "@/app/features/projects/store/use-create-template-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";
import { Loader, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useFilePicker } from "use-file-picker";

export default function CreateTemplateModal() {
  const { isOpen, onClose } = useCreateTemplateModal();
  const [formState, setFormState] = useState({
    thumbnail: null as string | null,
    json: null as string | null,
    title: null as string | null,
    width: null as number | null,
    height: null as number | null,
  });

  const mutate = useCreateTemplate();

  const { openFilePicker } = useFilePicker({
    accept: ".json",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          setFormState({
            ...formState,
            json: reader.result as string,
          });
        };
      }
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate.mutate(
      {
        json: formState.json || "",
        thumbnailUrl: formState.thumbnail || "",
        name: formState.title || "",
        width: formState.width || 0,
        height: formState.height || 0,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
            className="mb-4"
          />
          <DialogTitle className="text-center">Upload templates</DialogTitle>
          <DialogDescription className="text-center">
            Upload your own design templates for public use.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <form
            className="w-full space-y-2"
            onSubmit={onSubmit}
          >
            <UploadDropzone
              appearance={{
                button: "w-full text-sm font-medium",
                allowedContent: "hidden",
              }}
              content={{
                button: (
                  <>
                    <UploadCloud className="size-4 mr-2" />
                    Upload Template Image
                  </>
                ),
              }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFormState({
                  ...formState,
                  thumbnail: res[0].url,
                });
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                toast.error(`ERROR! ${error.message}`);
              }}
            />
            <div className="space-y-1 w-full">
              <Label>Template Title</Label>
              <Input
                type="text"
                placeholder="Ex. Business Card"
                value={formState.title || ""}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="flex gap-2 items-center flex-1">
              <div className="space-y-1 w-full">
                <Label>Width</Label>
                <Input
                  type="number"
                  placeholder="1200"
                  value={formState.width || ""}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      width: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-1 w-full">
                <Label>Height</Label>
                <Input
                  type="number"
                  placeholder="900"
                  value={formState.height || ""}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      height: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>
            <Button
              className="w-full"
              variant={"outline"}
              onClick={openFilePicker}
              type="button"
            >
              <UploadCloud className="size-4 mr-2" />
              Upload Template File
            </Button>
            <Button
              className="w-full"
              type="submit"
              disabled={mutate.isPending}
            >
              {mutate.isPending && (
                <Loader className="size-4 mr-2 animate-spin" />
              )}
              Submit Template
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
